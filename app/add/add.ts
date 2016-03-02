/// <reference path="../_all.ts" />

module reimsApp.Add {
    "use strict";

    interface IAddScope extends ng.IScope {
	onSubmit: Directives.IOnSubmit;
    }

    class AddController {
	public static $inject = ["$scope", "EyeglassRecords", "ngToast"];
	constructor (private $scope: IAddScope, private EyeglassRecords: EyeglassRecords.EyeglassRecords, private toast) {
	    console.log("Add controller");
	    $scope.onSubmit = {
		name: "Add",
		func: (valid: boolean, error: any, terms: EyeglassRecords.IEyeglassRecord) => {
		    if (!valid) {
			toast.create({content: "Please fill in a ".concat(error.required[0].$name), dismissButton: true, className: "warning"});
			return;
		    }

		    EyeglassRecords.addRecord(terms).then(function(res) {
			toast.create({content: "Record successfully added!", dismissButton: true, className: "success"});
		    }).catch(function(err) {
			toast.create({content: "An error occured: ".concat(err), dismissButton: true, className: "danger"});
		    });
		}
	    };
	}
    }

    var app = angular.module("reimsApp.Add", []);
    app.controller("AddCtrl", AddController);
}
