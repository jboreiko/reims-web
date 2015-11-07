'use strict';

var reimsApp = angular.module('reimsApp', [
    'ngRoute',
    'reimsControllers',
    'reimsServices'
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
	    templateUrl: 'partials/home.html',
	    controller: 'HomeCtrl'
	}).
	when('/sync', {
	    templateUrl: 'partials/sync.html',
	    controller: 'SyncCtrl'
	}).
	otherwise({
	    redirectTo: '/home'
	});
}]);

