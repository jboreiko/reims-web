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
			toast.warning("Please fill in a ".concat(error.required[0].$name));
			return;
		    }

		    EyeglassRecords.addRecord(terms).then((res) => {
			toast.success("Record successfully added!");
			this.updateUnfiled();
		    }).catch(function(err) {
			toast.danger("An error occured: ".concat(err));
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
