import express from 'express'
import elasticsearch from 'elasticsearch'
import body from 'body-parser'

var app = express()
app.use(body.json());


var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'info'
});

app.get('/', function (req, res) {
  res.send('Hello World!')
})

// POST countries/country/_search
// {
//   "query": {
//     "geo_shape": {
//       "shape_small": {
//         "shape": {
//           "type": "point",
//           "coordinates" : [12.0, 55.0]
//         },
//         "relation": "contains"
//       }
//     }
//   }
// }

app.post('/api/countries', async (req, res)  => {
  let coord = req.body.coord;
  // res.send({ foo: 'bar', coord });
  var answer = await client.msearch({
    body: [
      { index: 'countries', type: 'country' },
      {
        "query": {
          "geo_shape": {
            "shape_small": {
              "shape": {
                "type": "point",
                "coordinates" : [coord.lon, coord.lat]
              },
              "relation": "contains"
            }
          }
        }
      }
    ]});
  if (answer.responses[0].hits.hits.length === 0) return res.send({ found: false });
  var doc = answer.responses[0].hits.hits[0]._source;
  var iso2 = doc.iso2;
  var docsAirports = await client.search({
    index: 'airports',
    type: 'airport',
    body: {
      "size": 10000,
      "query": {
        "bool": {
          "must": {
            "match_all": {}
          },
            "filter": {
              "geo_shape": {
                "coordinate": {
                  "indexed_shape": {
                    "id": iso2,
                    "type": "country",
                    "index": "countries",
                    "path": "shape_small"
                  },
                  "relation": "within"
                }
              }
            }
        }
      }
    }
  });

  // setTimeout(() => {
  //   res.send({ found: true, data: { iso: doc.name, name: doc.name, iso3: doc.iso3, geo: doc.shape_small, airports: [] } });
  // }, 1000)
  return res.send({
    found: true,
    data: {
      iso: doc.name,
      name: doc.name,
      iso3: doc.iso3,
      geo: doc.shape_small,
      // airports: [],
      airports: docsAirports.hits.hits.map(airport => {
        let docAirport = airport._source;
        return {
          name: docAirport.name,
          coordinate: {
            lat: docAirport.coordinate.coordinates[1],
            lon: docAirport.coordinate.coordinates[0]
          }
        }
      })

    }
  });
})


    // name: 'Billund',
    // iata: 'BLL',
    // coordinate: {
    //   lat: 55.740322,
    //   lon: 9.151778
    // }


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})