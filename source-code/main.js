//Script to extract data from cassandra and return it to the external environment
//dependancies imported
var express = require('express');
var app = express();
var cassandra = require('cassandra-driver');
//Update the IP and Keyspace. The '/' is for routing the request
var client = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'davekeyspace1'});
app.get('/', function(req, res)
{
    client.execute("SELECT * from davetable", function (err, result) {
    if (!err){
        if ( result.rows.length > 0 ) { res.send(JSON.stringify(result.rows));}
        else {res.send("No results");}
        }
    });
});
app.listen(3000);