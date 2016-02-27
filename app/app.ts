/// <reference path="_all.ts" />

module reimsApp {
    "use strict";
    var reimsApp = angular.module("reimsApp", [
	"ngRoute",
	"ui.bootstrap",
	"reimsApp.Services",
	"reimsApp.Filters",
	"reimsApp.Directives",
	"reimsApp.NavBar",
	"reimsApp.Home",
	"reimsApp.Search",
	"reimsApp.Add",
	"reimsApp.Sync",
	"reimsApp.Modals"
    ]);

    reimsApp.config(["$routeProvider", function($routeProvider) {
	$routeProvider.
	    when("/search", {
		templateUrl: "partials/search.html",
		controller: "SearchCtrl",
		controllerAs: "Ctrl"
	    }).
	    when("/add", {
		templateUrl: "partials/add.html",
		controller: "AddCtrl"
	    }).
	    when("/help", {
		templateUrl: "partials/help.html"
	    }).
	    when("/home", {
		templateUrl: "partials/home.html",
		controller: "HomeCtrl"
	    }).
	    when("/sync", {
		templateUrl: "partials/sync.html",
		controller: "SyncCtrl",
		controllerAs: "Ctrl"
	    }).
	    otherwise({
		redirectTo: "/home"
	    });
    }]);
}
