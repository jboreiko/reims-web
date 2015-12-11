'use strict';

require('angular');
require('angular-route');
require('angular-pouchdb');
require('angular-bootstrap');
require('pouchdb');
require('bootstrap');
require('jquery');

// Local 
require('../build/app.js');
require('../build/controllers.js');
require('../build/services.js');
require('../build/filters.js');


export var reimsApp = angular.module('reimsApp', [
    'ngRoute',
    'reimsControllers',
    'reimsServices',
    'reimsFilters',
    'ui.bootstrap'
    // require('reimsControllers')
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
