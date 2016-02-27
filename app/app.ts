/// <reference path="_all.ts" />

module reimsApp {
    "use strict";
    var reimsApp = angular.module("reimsApp", [
	"ngRoute",
	"reimsControllers",
	"reimsServices",
	"reimsApp.Filters",
	"reimsApp.Directives",
	"reimsInventoryStatus",
	"ui.bootstrap",
	"reimsApp.NavBar",
	"reimsApp.Home",
	"reimsApp.Add"
	// require("reimsControllers") 
    ]);

    reimsApp.config(["$routeProvider", function($routeProvider) {
	$routeProvider.
	    when("/search", {
		templateUrl: "partials/search.html",
		controller: "SearchCtrl"
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
		controller: "SyncCtrl"
	    }).
	    otherwise({
		redirectTo: "/home"
	    });
    }]);
}
