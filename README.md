#MEAN Session Eight

http://bigspaceship.github.io/blog/2014/05/14/how-to-create-a-rest-api-with-node-dot-js/

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



