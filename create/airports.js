const readline = require('readline');
const fs = require('fs');
const elasticsearch = require('elasticsearch');
const async = require('async');
var body = [];


var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'info'
});


var mapAndCreateIndex = function(cb) {
  client.indices.exists({
    index: 'airports'
  }, function(err, res) {
    if (err) return err;
    if (res) return cb();
    client.indices.create({
      index: 'airports',
      body: {
        settings: {
          "number_of_shards": 1,
          "number_of_replicas": 0
        },
        mappings: {
          airport: {
            properties: {
              name: { type: "keyword" },
              country: { type: "keyword" },
              iata: { type: "keyword" },
              coordinate: { type: "geo_shape", points_only: true }
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


var readAll = function(cb) {
  const rl = readline.createInterface({
    input: fs.createReadStream('./data/airports/airports.dat')
  });

  rl.on('line', (line) => {
    var arr = line.split(',');
    var id = arr[4].replace(/(^\")|(\"$)/g, '');
    body.push({ index: { _index: 'airports', _type: 'airport', _id: id } });
    body.push({
      name: arr[2].replace(/(^\")|(\"$)/g, ''),
      country: arr[3].replace(/(^\")|(\"$)/g, ''),
      iata: id,
      coordinate: {
        type: 'point',
        coordinates: [parseFloat(arr[7]), parseFloat(arr[6])]
      }
    });
  });
  rl.on('close', cb)  
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


async.series([readAll, mapAndCreateIndex, bulkAll], function(err, res) {
  if (err) throw err;
  client.close();
});




