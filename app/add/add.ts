/// <reference path="../_all.ts" />

module reimsApp.Add {
    "use strict";

    interface IAddScope extends ng.IScope {
	onSubmit: Directives.IOnSubmit;
    }

    class AddController {
	public static $inject = ["$scope"];
	constructor (private $scope: IAddScope) {
	    console.log("Add controller");
	    $scope.onSubmit = {
		name: "Add",
		func: function(terms: string) {
		    console.log(terms);
		}
	    };
	}
    }

    var app = angular.module("reimsApp.Add", []);
    app.controller("AddCtrl", AddController);
}
