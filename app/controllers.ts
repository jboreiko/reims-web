/// <reference path="_all.ts" />
module reimsApp.Controllers {
    "use strict";

    var reimsControllers = angular.module("reimsApp.Controllers", []);

    reimsControllers.controller(
	"SyncCtrl", ["$scope", "$rootScope", "EyeglassRecords",
		     function($scope, $rootScope, EyeglassRecords) {
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

			 var updateCount = function()
			 {
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

		     }]);
}
