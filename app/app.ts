/// <reference path="_all.ts" />

namespace reimsApp {
    "use strict";
    const reimsApp = angular.module("reimsApp", [
        "ngRoute",
        "ui.bootstrap",
        "ngToast",
        "reimsApp.Filters",
        "reimsApp.Directives",
        "reimsApp.EyeglassRecords",
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
                controller: "AddCtrl",
                controllerAs: "Ctrl"
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

    reimsApp.config(["ngToastProvider", function(ngToast) {
        ngToast.configure({
            animation: "fade",
            dismissButton: true
        });
    }]);
}
