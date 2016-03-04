/// <reference path="../_all.ts" />

module reimsApp.Add {
    "use strict";

    interface IAddScope extends ng.IScope {
	onSubmit: Directives.IOnSubmit;
	unfiledRecords: any[];
    }

    class AddController {
	public static $inject = ["$scope", "EyeglassRecords", "ngToast"];
	constructor (private $scope: IAddScope,
		     private EyeglassRecords: EyeglassRecords.EyeglassRecords,
		     private toast) {
	    console.log("Add controller");
	    $scope.onSubmit = {
		name: "Add",
		func: (valid: boolean, error: any, terms: EyeglassRecords.IEyeglassRecord) => {
		    if (!valid) {
			toast.create({
			    content: "Please fill in a ".concat(error.required[0].$name),
			    className: "warning"});
			return;
		    }

		    EyeglassRecords.addRecord(terms).then((res) => {
			toast.create({content: "Record successfully added!", className: "success"});
			this.updateUnfiled();
		    }).catch(function(err) {
			toast.create({content: "An error occured: ".concat(err), className: "danger"});
		    });
		}
	    };

	    this.updateUnfiled();
	}

	private updateUnfiled() {
	    this.EyeglassRecords.getByStatus("unfiled").then((result) => {
		this.$scope.unfiledRecords = result.rows;
	    }).catch(function(err) {
		console.error(err);
	    });
	}
    }

    var app = angular.module("reimsApp.Add", []);
    app.controller("AddCtrl", AddController);
}
