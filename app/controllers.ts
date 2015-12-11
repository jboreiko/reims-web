'use strict';

export var reimsControllers = angular.module('reimsControllers', []);

reimsControllers.controller(
    'SearchCtrl', ['$scope', '$location', '$uibModal', 'EyeglassRecords',
		   function($scope, $location, $uibModal, EyeglassRecords) {
		       $scope.searchTerms = {}
		       
		       EyeglassRecords.localAllDocs({include_docs : true}).then(function(results) {
			   $scope.allResultRows = results.rows
		       }).catch(function(err) {
			   console.log(err)
		       });
		       
		       $scope.search = function(searchTerms) {
			   console.log("Running a search with ", searchTerms);
			   $location.path("/results");
		       };

		       $scope.dispense = function(row) {
			   console.log("Dispensing", row.id)
			   $scope.openModal({"name" : "dispense", "row" : row});
		       };

		       $scope.markAsMissing = function(row) {
			   console.log("Marking as missing", row.id)
			   $scope.openModal({"name" : "mark as missing", "row" : row});					       };

		       $scope.openModal = function (action) {
			   var modalInstance = $uibModal.open({
			       animation: true,
			       templateUrl: 'partials/resultActionModal.html',
			       controller: 'resultActionModalCtrl',
			       resolve: {
				   action: function() {
				       return action
				   }
			       }
			   })
			   modalInstance.result.then(function (result) {
			       console.log("Modal accepted, taking action")
			   }, function() {
			       console.log("Modal rejected, no action taken")
			   });

		       };
		   }]);

reimsControllers.controller(
    'resultActionModalCtrl', ['$scope', '$uibModalInstance', 'action',
			      function($scope, $uibModalInstance, action) {
				  $scope.action = action

				  $scope.ok = function() {
				      $uibModalInstance.close()
				  }

				  $scope.cancel = function() {
				      $uibModalInstance.dismiss('cancel');
				  }
			      }]);

reimsControllers.controller(
    'HomeCtrl', ['$scope', 'EyeglassRecords',
		 function($scope, EyeglassRecords) {
		     console.log("Home controller", EyeglassRecords);

		 }]);

reimsControllers.controller(
    'NavBarCtrl', ['$scope',
		   function($scope) {
		       $scope.isCollapsed = true;

		       $scope.collapse = function() {
			   $scope.isCollapsed = true;
		       }
		   }]);

reimsControllers.controller(
    'SyncCtrl', ['$scope', '$rootScope', 'EyeglassRecords',
		 function($scope, $rootScope, EyeglassRecords) {
		     console.log("Sync controller")
     		     $scope.docCount = "unknown"
		     $scope.syncState = "unknown"
		     
		     $rootScope.$on("sync:pause", function(event, data) {
			 console.log("Controller: pause")
			 $scope.syncState = "in sync"
			 updateCount()
		     })
		     $rootScope.$on("sync:change", function(event, data) {
			 $scope.syncState = "syncing"
 			 updateCount()
		     })

		     var updateCount = function()
		     {
			 EyeglassRecords.localInfo().then(function(info) {
			     $scope.localDocCount = info.doc_count;
			 });
			 EyeglassRecords.remoteInfo().then(function(info) {
			     $scope.masterDocCount = info.doc_count;
			 });
		     }
		     updateCount()

		     $scope.syncDisplayType = function() {
			 if ($scope.localDocCount != $scope.masterDocCount) {
			     return "warning"
			 } else {
			     return "success"
			 }
		     }

		 }]);
