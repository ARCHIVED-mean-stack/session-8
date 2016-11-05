var appapp = angular.module('pirateApp', ['ngRoute'])
    .controller('Hello', function ($scope, $http) {
        $http.get('/pirates').
            then(function (response) {
                $scope.pirata = response.data;
                // console.log($scope.pirata);
            });
    });

// appapp.controller('Test', function ($scope, $http) {
//     $scope.temp = 'temp';
// })


// appapp.config(['$locationProvider', '$routeProvider',
//     function config($locationProvider, $routeProvider) {
//         $routeProvider.
//             when('/', {
//                 controller: 'Hello',
//                 templateUrl: 'index.html'
//             }).
//             when('/pirata', {
//                 controller: 'Test',
//                 templateUrl: 'index2.html'
//             }).
//             otherwise('/');
//     }
// ]);