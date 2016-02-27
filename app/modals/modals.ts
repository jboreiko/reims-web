/// <reference path="../_all.ts" />

module reimsApp.Modals {
    "use strict";

    class ResultActionModalController {
	public static $inject = ["$scope", "$uibModalInstance", "action"];
	constructor (private $scope: ng.IScope, private $uibModalInstance: any, public action: any) {
	    console.log("Result active modal controller");
	}

	ok(): void {
	    this.$uibModalInstance.close();
	}

	cancel(): void {
	    this.$uibModalInstance.dismiss("cancel");
	}
    }

    var app = angular.module("reimsApp.Modals", []);
    app.controller("ResultActionModalCtrl", ResultActionModalController);
}
