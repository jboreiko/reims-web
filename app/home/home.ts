/// <reference path="../_all.ts" />

module reimsApp.Home {
    "use strict";

    class HomeController {
	public static $inject = ["$scope", "EyeglassRecords"];
	constructor (private $scope: ng.IScope, private EyeglassRecords: any) {
	    console.log("Home controller", EyeglassRecords);
	}
    }

    var app = angular.module("reimsApp.Home", []);
    app.controller("HomeCtrl", HomeController);
}
