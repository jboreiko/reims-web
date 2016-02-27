/// <reference path="../_all.ts" />

module reimsApp.Modals {
    "use strict";

    export function getResultActionModal(action: any): ng.ui.bootstrap.IModalSettings {
	console.log(action);
	return {
	    animation: true,
	    templateUrl: "partials/resultActionModal.html",
	    controller: "ResultActionModalCtrl",
	    controllerAs: "Ctrl",
	    resolve: {
		action: function() {
		    return action;
		}
	    }
	};
    }

    interface IModalScope extends ng.IScope {
	ok(): void;
	cancel(): void;
    }

    class ResultActionModalController {
	public static $inject = ["$scope", "$uibModalInstance", "action"];
	constructor ($scope: IModalScope, $uibModalInstance: any, public action: any) {
	    console.log("Result active modal controller with action and instance", action, $uibModalInstance);
	    $scope.ok = function(): void {
		$uibModalInstance.close();
	    };

	    $scope.cancel = function(): void {
		$uibModalInstance.dismiss();
	    };
	}
    }

    var app = angular.module("reimsApp.Modals", []);
    app.controller("ResultActionModalCtrl", ResultActionModalController);
}
