angular.module('pirateApp', [])
    .controller('PirateAppController', function ($scope, $http) {
        $http.get('/pirates').
            then(function (response) {
                $scope.pirates = response.data;
                console.log($scope.pirates);
            });
    });


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