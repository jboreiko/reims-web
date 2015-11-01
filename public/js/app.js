'use strict';

var reimsApp = angular.module('reimsApp', [
    'ngRoute',
    'reimsControllers'
]);

reimsApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
	when('/search', {
	    templateUrl: 'partials/search.html',
	    controller: 'SearchCtrl'
	}).
	when('/results', {
	    templateUrl: 'partials/results.html',
	}).
	when('/help', {
	    templateUrl: 'partials/help.html'
	}).
	when('/home', {
	    templateUrl: 'partials/home.html'
	}).
	otherwise({
	    redirectTo: '/search'
	});
}]);

