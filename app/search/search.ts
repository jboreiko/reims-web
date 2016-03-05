/// <reference path="../_all.ts" />

module reimsApp.Search {
    "use strict";

    class SearchController {
	public static $inject = ["$scope", "$uibModal", "$filter", "ngToast", "EyeglassRecords"];

	constructor (private $scope: any,
		     private $uibModal: ng.ui.bootstrap.IModalService,
		     private $filter: any,
		     private toast: any,
		     private EyeglassRecords: any) {
	    console.log("Search controller");

	    $scope.searchTerms = {};
	    $scope.fullSearchResults = [];
	    $scope.displayFull = false;

	    EyeglassRecords.getByStatus("filed").then(function(results) {
		$scope.allResultRows = results.rows;
	    }).catch(function(err) {
		console.log(err);
	    });

	    this.$scope.onSubmit = {
		name: "Full Search",
		func: function(valid: boolean, error: any, terms: any) {
		    // ignore validity of form
		    $scope.fullSearchResults = [{doc: {sku: "success"}}];
		}
	    };
	}

	search(searchTerms: any): void {
	    console.log("Running a search with ", searchTerms);
	};

	dispense(): void {
	    var rows = this.getSelectedRows();
	    console.log("Dispensing", rows);
	    var action: Modals.IModalAction = {"name" : "dispense",
					       "rows" : rows,
  					       "success" : () => {
						   this.EyeglassRecords.updateDocStatus(rows, "dispense");
					       }};
	    Modals.openModal(this.$uibModal, action);
	};

	markAsMissing(): void {
	    var rows = this.getSelectedRows();
	    console.log("Marking as missing", rows);
	    var action: Modals.IModalAction = {"name" : "mark as missing",
					       "rows" : rows,
					       "success": () => {
						   this.EyeglassRecords.updateDocStatus(rows, "missing");
					       }};

	    Modals.openModal(this.$uibModal, action);
	};

	update(): void {
	    var rows = this.getSelectedRows();
	    console.log("Update row", rows);
	    this.toast.danger("Update not available");
	};

	selectRow(row: any): void {
	    console.log("Toggling", row.id);
	    row.selected = row.selected ? false : true;
	};

	showFull(): void {
	    this.$scope.displayFull = true;
	};

	showQuick(): void {
	    this.$scope.displayFull = false;
	};

	private getSelectedRows() {
	    return this.$filter("filter")(this.$scope.allResultRows, {selected: true}, true);
	}
    }

    var app = angular.module("reimsApp.Search", []);
    app.controller("SearchCtrl", SearchController);
}
