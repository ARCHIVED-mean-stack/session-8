angular.module('myApp', []).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'index.html',
        controller: IndexCtrl
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);