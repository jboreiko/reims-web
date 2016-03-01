/// <reference path="../_all.ts" />

module reimsApp.Add {
    "use strict";

    interface IAddScope extends ng.IScope {
	onSubmit: Directives.IOnSubmit;
    }

    class AddController {
	public static $inject = ["$scope", "EyeglassRecords"];
	constructor (private $scope: IAddScope, private EyeglassRecords: EyeglassRecords.EyeglassRecords) {
	    console.log("Add controller");
	    $scope.onSubmit = {
		name: "Add",
		func: (valid: boolean, terms: EyeglassRecords.IEyeglassRecord) => {
		    if (!valid) {
			console.log("Fix the form please!");
			return;
		    }

		    EyeglassRecords.addRecord(terms);
		}
	    };
	}
    }

    var app = angular.module("reimsApp.Add", []);
    app.controller("AddCtrl", AddController);
}
