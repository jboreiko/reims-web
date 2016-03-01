/// <reference path="../_all.ts" />

module reimsApp.Add {
    "use strict";

    interface IAddScope extends ng.IScope {
	onSubmit: Directives.IOnSubmit;
    }

    class AddController {
	public static $inject = ["$scope", "EyeglassRecords"];
	constructor (private $scope: IAddScope, private EyeglassRecords) {
	    console.log("Add controller");
	    $scope.onSubmit = {
		name: "Add",
		func: (terms: string) => {
		    EyeglassRecords.addDoc(terms);
		}
	    };
	}
    }

    var app = angular.module("reimsApp.Add", []);
    app.controller("AddCtrl", AddController);
}
