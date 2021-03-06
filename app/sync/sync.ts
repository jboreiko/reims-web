/// <reference path="../_all.ts" />

namespace reimsApp.Sync {
    "use strict";

    class SyncController {
        public static $inject = ["$scope", "$rootScope", "EyeglassRecords"];
        constructor ($scope: any, $rootScope: any, EyeglassRecords: any) {
            console.log("Sync controller");
            $scope.docCount = "unknown";
            $scope.syncState = "unknown";
            $rootScope.$on("sync:pause", function(event, data) {
                console.log("Controller: pause");
                $scope.syncState = "in sync";
                updateCount();
            });
            $rootScope.$on("sync:change", function(event, data) {
                $scope.syncState = "syncing";
                updateCount();
            });

            const updateCount = function() {
                EyeglassRecords.localInfo().then(function(info) {
                    $scope.localDocCount = info.doc_count;
                });
                EyeglassRecords.remoteInfo().then(function(info) {
                    $scope.masterDocCount = info.doc_count;
                });
            };
            updateCount();

            $scope.syncDisplayType = function() {
                if ($scope.localDocCount !== $scope.masterDocCount) {
                    return "warning";
                } else {
                    return "success";
                }
            };
        }
    }

    const app = angular.module("reimsApp.Sync", []);
    app.controller("SyncCtrl", SyncController);
}
