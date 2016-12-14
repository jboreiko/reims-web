/// <reference path="../_all.ts" />

namespace reimsApp.Search {
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

            this.updateQuickResults();

            this.$scope.onSubmit = {
                name: "Full Search",
                func: (valid: boolean, error: any, terms: any) => {
                    // ignore validity of form
                    console.log("Running full search", this);
                    this.$scope.loading = true;
                    EyeglassRecords.fullSearch(terms, (results) => {
                        console.log("Running callback");
                        this.$scope.fullSearchResults = results.rows;
                        this.$scope.loading = false;
                    });
                    this.showFull();
                }
            };
        }

        updateQuickResults() {
            this.EyeglassRecords.getByStatus("filed").then((results) => {
                this.$scope.allResultRows = results.rows;
            });
        }

        search(searchTerms: any): void {
            console.log("Running a search with ", searchTerms);
        };

        dispense(): void {
            const rows = this.getSelectedRows();
            if (rows.length === 0) {
                this.toast.warning("Please select rows first");
                return;
            }

            console.log("Dispensing", rows);
            const action: Modals.IModalAction = {"name" : "dispense",
                            "rows" : rows,
                            "success" : () => {
                                this.EyeglassRecords.updateRowsStatus(rows, "dispense");
                            }};
            Modals.openModal(this.$uibModal, action);
        };

        markAsMissing(): void {
            const rows = this.getSelectedRows();
            if (rows.length === 0) {
                this.toast.warning("Please select rows first");
                return;
            }

            console.log("Marking as missing", rows);
            const action: Modals.IModalAction = {"name" : "mark as missing",
                            "rows" : rows,
                            "success": () => {
                            this.EyeglassRecords.updateRowsStatus(rows, "missing");
                            }};

            Modals.openModal(this.$uibModal, action);
        };

        update(): void {
            const rows = this.getSelectedRows();
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

    const app = angular.module("reimsApp.Search", []);
    app.controller("SearchCtrl", SearchController);
}
