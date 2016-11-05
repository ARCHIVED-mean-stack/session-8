// var express = require('express');
// var app = express();

// app.get('/', function (req, res) {
//     res.send('Hello Seattle\n');
//     console.dir(res)
// });

// app.listen(3001);
// console.log('Server running at http://localhost:3001/');




// var express = require('express');

// var app = express();

// require('./routes')(app);

// app.listen(3001);
// console.log("Lootin\' on port 3001...");

// ======


// var express = require('express'),
//     mongoose = require('mongoose'),
//     fs = require('fs');

// var mongoUri = 'mongodb://localhost/rest-api';
// mongoose.connect(mongoUri);
// var db = mongoose.connection;
// db.on('error', function () {
//     throw new Error('unable to connect to database at ' + mongoUri);
// });

// var app = express();

// app.configure(function () {
//     app.use(express.bodyParser());
// });

// require('./models/pirate');
// require('./routes')(app);

// app.listen(3001);
// console.log('Listening on port 3001...');

// ======


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

db.on('error', function () {
    throw new Error('unable to connect to database at ' + mongoUri);
});

app.use(express.static('static'))

app.use(bodyParser.json())

app.listen(3001);
console.log('Listening on port 3001...');