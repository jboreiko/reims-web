/// <reference path="../_all.ts" />

module reimsApp.Add {
    "use strict";

    interface IOnSubmit {
	name: string;
	func(terms: string): void;
    }

    interface IAddScope extends ng.IScope {
	onSubmit: IOnSubmit;
    }

    class AddController {
	public static $inject = ["$scope"];
	constructor(private $scope: IAddScope) {
	    console.log("Add controller");
	    $scope.onSubmit = {
		name: "Add",
		func: function(terms: string) {
		    console.log(terms);
		}
	    };
	}
    }

    export var app = angular.module("reimsApp.Add", []);
    app.controller("AddCtrl", AddController);
}
