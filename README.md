#MEAN Session Eight

Node server.js

```js
var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Ahoy there matey\n');
}).listen(3001);

console.log('Server running at http://localhost:3001/');
```

`$ npm init`

`$ npm install express`

Edit server.js for express:

```
var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send('Ahoy\n');
});

app.listen(3001);
console.log('Server running at http://localhost:3001/');
```

`npm install --save-dev nodemon`

REST API
* A URL route schema to map requests to app actions
* A Controller to handle each action
* Data to respond with
* Place to store the data
* Interface to access and change data

###Routes

Predefined URL paths your API responds to. Think of each Route as listening to three parts:

* A specific HTTP Action
* A specific URL path
* A handler method

###GET

This example of routing handles all GET Requests. The URL path is the root of the site, the handling method is an anonymous function, and the response plain text:

```js
app.get('/', function(req, res) {
    res.send('Return JSON or HTML View');
});
```
A peak inside the response:

```js
app.get('/', function (req, res) {
    res.send('Ahoy\n');
    console.dir(res);
});
```

###Request

```
app.get('/pirate/:name', function(req, res) {
   console.log(req.params.name)
});
```

And run `http://localhost:3001/pirate/barney`

```
app.get('/pirate/:name', function(req, res) {
   res.send('{"id": 1,"name":"Matt", "vessel":"HMS Brawler"}');
});
```

###Routes

Add routes.js to /app:

```js
module.exports = function (app) {
    var pirates = require('./controllers/pirates');
    app.get('/pirates', pirates.findAll);
    app.get('/pirates/:id', pirates.findById);
    app.post('/pirates', pirates.add);
    app.put('/pirates/:id', pirates.update);
    app.delete('/pirates/:id', pirates.delete);
}
```

We've created a pirates controller and placed all our Request event handling methods inside the controller. 

The main REST HTTP actions are handled. We've modeled our URL routes off of REST API conventions, and named our handling methods clearly.

###Controllers

Create a folder called controllers inside /app. 

Create a new file inside of that called pirates.js. We'll add each request handling method for pirates data to this file one by one. For now add these placeholders to pirates.js so we can restart the server without errors:

```js
exports.findAll = function () { };
exports.findById = function () { };
exports.add = function () { };
exports.update = function () { };
exports.delete = function () { };
```

Update findAll's definition' to the function below:

```js
exports.findAll = function(req, res){
	res.send([{
		"id": 1,
		"name": "Max",
		"vessel": "HMS Booty",
		"weapon": "sword"
	}]);
};
```

Update server.js to require our routes file. The .js file extension can be omitted.

```js
var express = require('express');

var app = express();

require('./routes')(app);

app.listen(3001);
console.log("Lootin\' on port 3001...");
```

Navigate to `localhost:3001/pirates`

###Mongo

[Install](http://docs.mongodb.org/manual/installation/) Mongodb.

Run mongod in another Terminal tab if it's not running already.

###Mongoose.js

A [Mongo Driver](http://mongoosejs.com).

Ask NPM to install this dependency for you, and update your package.json file with this dependency for you with the --save-dev option.

`npm install mongoose --save-dev`

Update server.js:


```js
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
```

We're requiring the Mongoose module which will communicate with Mongo for us. The mongoUri is a location to the Mongo DB that Mongoose will create if there is not one there already. We added an error handler there to help debug issues connecting to Mongo collections. We also configured Express to parse requests' bodies (we'll use that for POST requests). Lastly, we require the pirate model which we'll make next.

###Define Data Models

Create a new folder called models and add a new file pirate.js for our Pirate Model.

```js
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PirateSchema = new Schema({
    name: String,
    vessel: String,
    weapon: String
});

mongoose.model('Pirate', PirateSchema);
```

Require Mongoose into this file, and create a new Schema object. This schema helps Mongoose make sure it's getting and setting the right and well-formed data from and to the Mongo collection. Our schema has three String properties which define a Pirate object. The last line creates the Pirate model object, with built in Mongo interfacing methods. We'll refer to this Pirate object in other files.

Update controllers/pirates.js to require Mongoose, so we can create an instance of our Pirate model to work with. Update findAll() to query Mongo with the find() data model method.

```js
var mongoose = require('mongoose'),
    Pirate = mongoose.model('Pirate');

exports.findAll = function (req, res) {
    Pirate.find({}, function (err, results) {
        return res.send(results);
    });
};
exports.findById = function () { };
exports.add = function () { };
exports.update = function () { };
exports.delete = function () { };
```

Passing find() {} means we are not filtering data by any of its properties, so please return all of it. Once Mongoose looks up the data it returns an error message and a result set. Use res.send() to return the raw results.

###Start Mongoose

Restart the server. Visit the API endpoint for all pirates localhost:3001/pirates. You'll get JSON data back, in the form of an empty array.

###Data

Since I didn't feel like messing with Mongo command-line, I decided to import pirate data with our REST API. Add a new route endpoint to routes.js.

```js
app.get('/import', musicians.import);
```

Now to define the import method in our Pirates Controller controllers/pirates.js:

```js
exports.import = function (req, res) {
    Pirate.create(
        { "name": "William Kidd", "vessel": "Adventure Galley", "weapon": "Sword" },
        { "name": "Samuel Bellamy", "vessel": "Whydah", "weapon": "Cannon" },
        { "name": "Mary Read", "vessel": "Rackham", "weapon": "Knife" },
        { "name": "John Rackham", "vessel": "The Calico", "weapon": "Peg Leg" }
        , function (err) {
            if (err) return console.log(err);
            return res.send(202);
        });
};
```

This import method adds four documents out of the hard-coded JSON to a pirates collection. The Pirate model is referenced here to call its create method. create() takes one or more documents in JSON form, and a callback to run on completion. If an error occurs, Terminal will spit the error out, and the request will timeout in the browser. On success, 202 Accepted HTTP status code is returned to the browser. Restart your node server and visit this new endpoint to import data.

Test at: `localhost:3001/import/`

###Returning Data

Now visit your pirates/ endpoint to view all new pirates data. You'll see an array of JSON objects, each in the defined schema, with an additional generated unique private _id and internal __v version key. 

####Find By id

Recall our route for getting a pirate by its id app.get('/pirates/:id', pirates.findById). Here is the handler method:

```js
exports.findById = function (req, res) {
    var id = req.params.id;
    Pirate.findOne({ '_id': id }, function (err, result) {
        return res.send(result);
    });
};
```

This route's path uses a parameter pattern for id /pirates/:id which we can refer to in req. Pass this id to Mongoose to look up and return just one document. Restart the server. At your find all endpoint, copy one of the super long ids and paste it in at the end of the current url in the browser. Refresh your browser. You'll get a single JSON object for that one pirate's document. Nice.

####Update

PUT HTTP actions in a REST API correlate to an Update method. The route for Update also uses an :id parameter.

```js
exports.update = function (req, res) {
    var id = req.params.id;
    var updates = req.body;

    Pirate.update({ "_id": id }, req.body,
        function (err, numberAffected) {
            if (err) return console.log(err);
            console.log('Updated %d pirates', numberAffected);
            return res.send(202);
        });
}
```

Notice the updates variable storing the req.body. req.body is useful when you want to pass in larger chunks of data such as a single JSON object. Here we will pass in a JSON object following the schema of only the model's properties you want to change.

The model's update() takes three parameters:

* JSON object of matching properties to look up the doc with to update
* JSON object of just the properties to update
* callback function that returns the number of documents updated

###Curl

PUT actions are not easy to test in the browser, so I used cURL in Terminal after restarting the server.

```
$ curl -i -X PUT -H 'Content-Type: application/json' -d '{"vessel": "HMS Brawler"}' http://localhost:3001/pirates/535fe13ac688500000c2b28b
```

`581b8ffeed13e403487fe1a4`

This sends a JSON Content-Type PUT request to our update endpoint. That JSON object is the request body, and the long hash at the end of the URL is the id of the pirate we want to update. Terminal will output a JSON object of the response to the cURL request and Updated 1 pirates from our callback function.

Visit this same URL from the cURL request in the browser to see the changes.

####Add

We used create() earlier to add multiple documents to our Pirates Mongo collection. Our POST handler uses the same method to add one new Pirate to the collection. Once added, the response is the full new Pirate's JSON object.

```js
exports.add = function (req, res) {
    Pirate.create(req.body, function (err, pirate) {
        if (err) return console.log(err);
        return res.send(pirate);
    });
}
```

Restart the server. Use cURL to POST to the add endpoint with the full Musician JSON as the request body.

```
$ curl -i -X POST -H 'Content-Type: application/json' -d '{"name": "Jean Lafitte", "vessel": "Barataria Bay", "weapon":"curses"}' http://localhost:3001/pirates
```

Refresh `http://localhost:3001/pirates` to see the new entry at the end.

####Delete

Our final REST endpoint, delete, reuses what we've done above. Add this to controllers/pirates.js.

```js
exports.delete = function (req, res) {
    var id = req.params.id;
    Pirate.remove({ '_id': id }, function (result) {
        return res.send(result);
    });
};
```

Restart, and check it out with:

```
$ curl -i -X DELETE http://localhost:3001/musicians/535feac1cc539500000a209f
```


##Building a Front End for Our API

Add a static directory for our assets to server.js

`app.use(express.static('static'))`

Add a layouts directory and into it `index.html`

```html
<!doctype html>
<html ng-app='pirateApp'>

<head>
	<title>AngularJS Data Viz</title>

	<link rel="stylesheet" href="css/styles.css">
	<script src="https://code.angularjs.org/1.5.8/angular.js"></script>
	<script src="js/app.js"></script>

</head>

<body>
<h1>test</h1>
<img src="img/temp.png">
</body>
</html>
```

Add this route to routes.js:

```js
app.get('/', function(req, res) {
    res.sendfile('./layouts/index.html')
})
```

Create css, js, and img folders in static. 

Populate the js folder with app.js:

```js
console.log('made it');
angular.module('pirateApp', []);
```

The css folder with styles.css:

```
* {
    color: red;
}
```

And add a randon temp.png image to the img folder.


```
angular.module('pirateApp', []).controller('Hello', function ($scope, $http) {
    $http.get('http://rest-service.guides.spring.io/greeting').
        then(function (response) {
            $scope.greeting = response.data;
        });
});
```


```html
<body ng-controller="Hello">
    <h1>Pirates</h1>
    <p>The ID is {{greeting.id}}</p>
    <p>The content is {{greeting.content}}</p>
</body>
```

###Angular Routes vs Express Routes

```js
angular.module('pirateApp', [])
    .controller('PirateAppController', function ($scope, $http) {
        $http.get('/pirates').
            then(function (response) {
                $scope.pirates = response.data;
                console.log($scope.pirates);
            });
    });
```


```html
<body ng-controller="PirateAppController">
	<h1>Pirates</h1>
	<ul ng-repeat="pirate in pirates">
		<li>
			test
		</li>
	</ul>
</body>
```


```js
app.get('/*', function (req, res, next) {
	res.sendfile('./layouts/index.html')
})
```




















##Visualisation

```
var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
```

`https://expressjs.com/en/starter/static-files.html`

`https://expressjs.com/en/starter/static-files.html`


![Image of chart](https://github.com/mean-fall-2016/session-7/blob/master/viz.png)

```html
<div ng-app="graphApp" ng-controller="graphController">
	<div class="chart" style="width:{{width}}px; height:{{height}}px;">
		<div class="y" style="width:{{height}}px;">{{yAxis}}</div>
		<div class="x">{{xAxis}}</div>
	</div>
</div>
```

```js
var app = angular.module('graphApp', []);
app.controller('graphController', function($scope){

	$scope.width = 600;
	$scope.height = 400;
	$scope.yAxis = "Booty Haul";
	$scope.xAxis = "2015";	
});
```

Add some basic css
```csshtml {
  box-sizing: border-box;
  background-image: -webkit-linear-gradient(top, #023e54, #10aac0);
  min-height: 100%;
  height: auto;
  margin: 0; 
}

body {
  font-family: Helvetica, Arial, sans-serif;
  color: #fff;
  text-align: center;
  margin: 0;
}
.chart { 
	border-left: 2px solid #ddd; 
	border-bottom: 2px solid #ddd;
	margin: 60px auto;
	position: relative;
}
.y {
	position: absolute;
	bottom: 0;
	padding: 6px;
	transform-origin: bottom left;
	transform: rotate(-90deg);
	text-align: center;
}
.x {
	position: absolute;
	bottom: -70px;
	padding: 6px;
	width: 100%;
	text-align: center;
}
```

Take the data from data.js and add it to the controller:

```js
	var app = angular.module('graphApp', []);
	app.controller('graphController', function($scope){

		$scope.width = 600;
		$scope.height = 400;
		$scope.yAxis = "Booty Haul";
		$scope.xAxis = "2015";

		$scope.data = [
		{
			label: 'January',
			value: 36
		},
		{
			label: 'February',
			value: 54
		},
		{
			label: 'March',
			value: 62
		},
		{
			label: 'April',
			value: 82
		},
		{
			label: 'May',
			value: 96
		},
		{
			label: 'June',
			value: 104
		},
		{
			label: 'July',
			value: 122
		},
		{
			label: 'August',
			value: 152
		},
		{
			label: 'September',
			value: 176
		},
		{
			label: 'October',
			value: 180
		},
		{
			label: 'November',
			value: 252
		},
		{
			label: 'December',
			value: 342
		}
		];
	});
```
Add the bar data to the view:

```html
<div ng-repeat="bar in data" class="bar" style="height:{{bar.value}}px; width:{{width / data.length - 8 }}px; left:{{$index / data.length * width }}px">
	<span class="value">{{bar.value}}</span>
	<span class="label">{{bar.label}}</span>
</div>
```

Add display for this to the css
```css.bar {
	background: rgba(146, 84, 164, 0.8);
	position: absolute;
	bottom: 0;
}
.bar:nth-of-type(even) {
	background: rgba(188, 77, 61, 0.8);
}
.value {
	display: inline-block;
	margin-top: 10px;
}
.label {
	position: absolute;
	bottom: -30px;
	font-size: 10px; 
	transform: rotate(30deg);
}
```

Add the array processor for `$scope.max`

```js
	var app = angular.module('graphApp', []);
	app.controller('graphController', function($scope){
		...

		$scope.max = 0;
		var arrLength = $scope.data.length;
		for (var i =0; i < arrLength; i++){
			if($scope.data[i].value > $scope.max){
				$scope.max = $scope.data[i].value;
			}
		}
	});

```

Use it to calculate the max height of the columns in css:

```html
style="height:{{bar.value / max * height }}px; width:{{width / data.length - 8 }}px; left:{{$index / data.length * width }}px"
```




```css
html {
  box-sizing: border-box;
  background-image: -webkit-linear-gradient(top, #023e54, #10aac0);
  min-height: 100%;
  height: auto;
  margin: 0; 
}

body {
  font-family: Helvetica, Arial, sans-serif;
  color: #fff;
  text-align: center;
  margin: 0;
}
.chart { 
	border-left: 2px solid #ddd; 
	border-bottom: 2px solid #ddd;
	margin: 60px auto;
	position: relative;
}
.y {
	position: absolute;
	bottom: 0;
	padding: 6px;
	transform-origin: bottom left;
	transform: rotate(-90deg);
	text-align: center;
}
.x {
	position: absolute;
	bottom: -70px;
	padding: 6px;
	width: 100%;
	text-align: center;
}
.bar {
	background: rgba(146, 84, 164, 0.8);
	position: absolute;
	bottom: 0;
}
.bar:nth-of-type(even) {
	background: rgba(188, 77, 61, 0.8);
}
.value {
	display: inline-block;
	margin-top: 10px;
}
.label {
	position: absolute;
	bottom: -30px;
	font-size: 10px; 
	transform: rotate(30deg);
}
```


##Homework




##Reading

Dickey - Write Modern Web Apps with the MEAN Stack: Mongo, Express, AngularJS and Node.js, chapter 5. Please attempt to implement his sample app on your computer. Here's his [Github repo with sample code](https://github.com/dickeyxxx/mean-sample). Be sure to look at the branches (they correspond to chapter numbers) and don't forget to run `sudo npm install` when running the sample code.



