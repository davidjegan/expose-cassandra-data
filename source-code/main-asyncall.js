var express = require('express');
var app = express();

var cassandra = require('cassandra-driver');
var async = require('async');
var client = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'davekeyspace1'});

app.get('/', function(req, res){

async.series([
    function (callback) {
        client.execute("SELECT * from davetable", function (err, result) {
            if (!err){
                if ( result.rows.length > 0 ) {
                res.send(JSON.stringify(result.rows));
                  var user = result.rows[0];
                } else {
                    console.log("No results");
                }
            }
            callback(err, null);
        });
    }
], function (err, results) {
    process.exit();
});

});
app.listen(3000);



