/// <reference path="../_all.ts" />

module reimsApp.Search {
    "use strict";

    class SearchController {
	public static $inject = ["$scope", "$uibModal", "$filter", "EyeglassRecords"];

	constructor (private $scope: any,
		     private $uibModal: ng.ui.bootstrap.IModalService,
		     private $filter: any,
		     private EyeglassRecords: any) {
	    console.log("Search controller");

	    $scope.searchTerms = {};
	    $scope.fullSearchResults = [{doc: {sku: "test"}}];
	    $scope.displayFull = false;

	    EyeglassRecords.localAllDocs({include_docs : true}).then(function(results) {
		$scope.allResultRows = results.rows;
	    }).catch(function(err) {
		console.log(err);
	    });

	    this.$scope.onSubmit = {
		name: "Full Search",
		func: function(terms) {
		    $scope.fullSearchResults = [{doc: {sku: "success"}}];
		}
	    };
	}

	search(searchTerms: any): void {
	    console.log("Running a search with ", searchTerms);
	};

	dispense(row: any): void {
	    console.log("Dispensing", row.id);
	    Modals.openModal(this.$uibModal, {"name" : "dispense", "rows" : [row], "success" : function() {
		console.log("Success man");
	    }});
	};

	markAsMissing(row: any): void {
	    console.log("Marking as missing", row.id);
	    Modals.openModal(this.$uibModal, {"name" : "mark as missing", "rows" : [row], "success": function() {
		console.log("Success for missing");
	    }});
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
