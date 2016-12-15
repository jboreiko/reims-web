/// <reference path="../_all.ts" />

namespace reimsApp.Modals {
    "use strict";

    export interface IModalAction {
        name: string;
        rows: any[];
        success(): void;
        failure?(): void;
    };

    export function openModal($uibModal: ng.ui.bootstrap.IModalService, action: IModalAction): void {
        const modalInstance = $uibModal.open(getResultActionModal(action));
        modalInstance.result.then(function (result) {
            console.log("Modal accepted, taking action");
            action.success();
        }, function() {
            console.log("Modal rejected, no action taken");
            if (action.hasOwnProperty("failure")) {
                action.failure();
            }
        });
    };

    function getResultActionModal(action: IModalAction): ng.ui.bootstrap.IModalSettings {
        console.log(action);
        return {
            animation: true,
            templateUrl: "partials/resultActionModal.html",
            controller: "ResultActionModalCtrl",
            size: "lg",
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
        constructor ($scope: IModalScope, $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance, public action: IModalAction) {
            console.log("Result active modal controller with action and instance", action, $uibModalInstance);
            $scope.ok = function(): void {
                $uibModalInstance.close();
            };

            $scope.cancel = function(): void {
                $uibModalInstance.dismiss();
            };
        }
    }

    const app = angular.module("reimsApp.Modals", []);
    app.controller("ResultActionModalCtrl", ResultActionModalController);
}
