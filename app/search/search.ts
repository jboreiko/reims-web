/// <reference path="../_all.ts" />

module reimsApp.Search {
    "use strict";

    class SearchController {
	public static $inject = ["$scope", "$uibModal", "EyeglassRecords"];

	constructor (private $scope: any,
		     private $uibModal: ng.ui.bootstrap.IModalService,
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

	dispense(row: any): void {
	    console.log("Dispensing", row.id, this.EyeglassRecords);
	    var action: Modals.IModalAction = {"name" : "dispense",
					       "rows" : [row],
  					       "success" : () => {
						   this.EyeglassRecords.updateDocStatus(row.doc, "dispense");
					       }};
	    Modals.openModal(this.$uibModal, action);
	};

	markAsMissing(row: any): void {
	    console.log("Marking as missing", row.id);
	    var action: Modals.IModalAction = {"name" : "mark as missing",
					       "rows" : [row],
					       "success": () => {
						   this.EyeglassRecords.updateDocStatus(row.doc, "missing");
					       }};

	    Modals.openModal(this.$uibModal, action);
	};

	update(row: any): void {
	    console.log("Update row", row.id);
	};

	selectRow(row: any): void {
	    console.log("Selecting", row.id);
	    this.$scope.selectedRow = row;
	};

	showFull(): void {
	    this.$scope.displayFull = true;
	};

	showQuick(): void {
	    this.$scope.displayFull = false;
	};
    }

    var app = angular.module("reimsApp.Search", []);
    app.controller("SearchCtrl", SearchController);
}
