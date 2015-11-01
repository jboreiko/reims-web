'use strict';
console.log("Loaded main.js");

var reimsApp = angular.module('reimsApp', [
    'ngRoute',
    'reimsControllers'
]);

reimsApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/search', {
        templateUrl: 'partials/search.html',
        controller: 'SearchCtrl'
      }).
      otherwise({
        redirectTo: '/search'
      });
  }]);

console.log("Main complete");
