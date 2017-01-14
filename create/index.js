var elasticsearch = require('elasticsearch');
var async = require('async');
const File = require('./c50.json');
const inspect = require('util').inspect;
var body = [];
File.features.forEach(fe => {
  var id = fe.properties.iso_a2;
  body.push({ index: { _index: 'countries', _type: 'country', _id: id } });
  body.push({ name: fe.properties.name, iso2: id, iso3: fe.properties.iso_a3, shape_small: fe.geometry });
})

// console.log(inspect(body[1], { depth:null }));
// console.log(File.features[0], { depth: null });

// return;


var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'info'
});


var mapAndCreateIndex = function(cb) {
  client.indices.exists({
    index: 'countries'
  }, function(err, res) {
    if (err) return err;
    if (res) return cb();
    client.indices.create({
      index: 'countries',
      body: {
        settings: {
          "number_of_shards": 1,
          "number_of_replicas": 0
        },
        mappings: {
          country: {
            properties: {
              name: { type: "keyword" },
              iso3: { type: "keyword" },
              iso2: { type: "keyword" },
              shape_small: { type: "geo_shape" }
            }
          }
        }
      }
    }, function(err, res) {
      if (err) return err;
      cb();
    })
  })
}


var indexOne = function(cb) {
  client.index({
    index: 'countries',
    type: 'country',
    body: body[1]
  }, function(err, res) {
    if (res) return err;
    cb();
  })
}


var bulkAll = function(cb) {
  console.log(body.length);
  client.bulk({
    body: body
  }, function(err, res) {
    if (err) return err;
    cb();
  });
}

async.series([mapAndCreateIndex, bulkAll], function(err, res) {
  if (err) throw err;
  client.close();
});



// // const 
// // client.index({ index: 'countries', type: 'country', id: 'DK', body: DK }, (res, err) => console.log(res, err));
// // client.index({ index: 'countries', type: 'country', id: 'DE', body: DE }, (res, err) => console.log(res, err));

// // POST countries/country/_search
// // {
// //   "query": {
// //     "geo_shape": {
// //       "shape_small": {
// //         "shape": {
// //           "type": "point",
// //           "coordinates" : [12.0, 55.0]
// //         },
// //         "relation": "contains"
// //       }
// //     }
// //   }
// // }
