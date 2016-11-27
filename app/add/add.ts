/// <reference path="../_all.ts" />

module reimsApp.Add {
    "use strict";

    interface IAddScope extends ng.IScope {
	onSubmit: Directives.IOnSubmit;
	unfiledRecords: any[];
    }

    class AddController {
	public static $inject = ["$scope", "$filter", "$uibModal", "EyeglassRecords", "ngToast"];
	constructor (private $scope: IAddScope,
		     private $filter: any,
		     private $uibModal: ng.ui.bootstrap.IModalService,
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

	private getSelectedRows() {
	    return this.$filter("filter")(this.$scope.unfiledRecords, {selected: true}, true);
	}

	selectRow(row: any): void {
	    console.log("Toggling", row);
	    row.selected = row.selected ? false : true;
	};

	markAsFiled() {
	    var rows = this.getSelectedRows();
	    if (rows.length === 0) {
		this.toast.warning("Please select rows first");
		return;
	    }
	    console.log("Marking as filed", rows);
	    var action: Modals.IModalAction = {"name" : "filed",
					       "rows" : rows,
  					       "success" : () => {
						   this.EyeglassRecords.updateRowsStatus(rows, "filed");
					       }};
	    Modals.openModal(this.$uibModal, action);
	}

	update() {
	    var rows = this.getSelectedRows();
	    console.log("Update row", rows);
	    this.toast.danger("Update not available");
	}

	remove() {
	    var rows = this.getSelectedRows();
	    if (rows.length === 0) {
		this.toast.warning("Please select rows first");
		return;
	    }
	    console.log("Remove rows", rows);
	    var action: Modals.IModalAction = {"name" : "remove",
					       "rows" : rows,
					       "success" : () => {
						   this.EyeglassRecords.deleteRows(rows);
					       }};
	    Modals.openModal(this.$uibModal, action);
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
