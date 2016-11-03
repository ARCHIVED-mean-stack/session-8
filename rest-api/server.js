var express = require('express');
var mongoose = require('mongoose');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser')
var mongoUri = 'mongodb://localhost/rest-api';
var db = mongoose.connection;

require('./models/pirate');
require('./routes')(app);

mongoose.connect(mongoUri);

db.on('error', function() {
    throw new Error('unable to connect to database at ' + mongoUri);
});

app.use(express.static('static'))

app.use(bodyParser.json())
// app.configure(function() {
//     app.use(express.bodyParser());
// });



app.listen(3001);
console.log('Listening on port 3001...');