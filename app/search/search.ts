/// <reference path="../_all.ts" />

module reimsApp.Search {
    "use strict";

//    interface ISearchScope extends ng.IScope {
//	onSubmit: Directives.IOnSubmit;
//    }

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

	openModal(action: any): void {
	    var modalInstance = this.$uibModal.open(Modals.getResultActionModal(action));
	    modalInstance.result.then(function (result) {
		console.log("Modal accepted, taking action");
	    }, function() {
		console.log("Modal rejected, no action taken");
	    });
	};

	search(searchTerms: any): void {
	    console.log("Running a search with ", searchTerms);
	};

	dispense(row: any): void {
	    console.log("Dispensing", row.id);
	    this.openModal({"name" : "dispense", "row" : row});
	};

	markAsMissing(row: any): void {
	    console.log("Marking as missing", row.id);
	    this.openModal({"name" : "mark as missing", "row" : row});
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
