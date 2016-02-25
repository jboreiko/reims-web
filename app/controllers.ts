/// <reference path="_all.ts" />
"use strict";

var reimsControllers = angular.module("reimsControllers", []);

reimsControllers.controller(
    "SearchCtrl", ["$scope", "$location", "$uibModal", "$filter", "EyeglassRecords",
		   function($scope, $location, $uibModal, $filter, EyeglassRecords) {
		       $scope.searchTerms = {};
		       EyeglassRecords.localAllDocs({include_docs : true}).then(function(results) {
			   $scope.allResultRows = results.rows;
		       }).catch(function(err) {
			   console.log(err);
		       });
		       $scope.search = function(searchTerms) {
			   console.log("Running a search with ", searchTerms);
			   // $location.path("/results");
		       };

		       $scope.dispense = function(row) {
			   console.log("Dispensing", row.id);
			   $scope.openModal({"name" : "dispense", "row" : row});
		       };

		       $scope.markAsMissing = function(row) {
			   console.log("Marking as missing", row.id);
			   $scope.openModal({"name" : "mark as missing", "row" : row});					       };

		       $scope.update = function(row) {
			   console.log("Update row", row.id);
		       };

		       $scope.selectResult = function(id) {
			   console.log("Selecting", id);
			   $scope.selectedResult = id;
		       };

		       $scope.fullSearchResults = [{doc: {sku: "test"}}];
		       $scope.onSubmit = {
			   name: "Full Search",
			   func: function(terms) {
			       $scope.fullSearchResults = [{doc: {sku: "success"}}];
			   }
		       };

		       $scope.displayFull = false;
		       $scope.showFull = function() {
			   $scope.displayFull = true;
		       };

		       $scope.showQuick = function() {
			   $scope.displayFull = false;
		       };

		       $scope.openModal = function (action) {
			   var modalInstance = $uibModal.open({
			       animation: true,
			       templateUrl: "partials/resultActionModal.html",
			       controller: "resultActionModalCtrl",
			       resolve: {
				   action: function() {
				       return action;
				   }
			       }
			   });
			   modalInstance.result.then(function (result) {
			       console.log("Modal accepted, taking action");
			   }, function() {
			       console.log("Modal rejected, no action taken");
			   });

		       };
		   }]);

reimsControllers.controller(
    "AddCtrl", ["$scope",
		function($scope) {

		    $scope.onSubmit = {
			name: "Add",
			func: function(terms) {
			    console.log(terms);
			}
		    };
		}]);

reimsControllers.controller(
    "resultActionModalCtrl", ["$scope", "$uibModalInstance", "action",
			      function($scope, $uibModalInstance, action) {
				  $scope.action = action;

				  $scope.ok = function() {
				      $uibModalInstance.close();
				  };

				  $scope.cancel = function() {
				      $uibModalInstance.dismiss("cancel");
				  };
			      }]);

reimsControllers.controller(
    "HomeCtrl", ["$scope", "EyeglassRecords",
		 function($scope, EyeglassRecords) {
		     console.log("Home controller", EyeglassRecords);

		     var data = [];
		     EyeglassRecords.localAllDocs({include_docs : true}).then(function(results) {
			 angular.forEach(results.rows, function(row) {
			     console.log(row);
			 });
		       }).catch(function(err) {
			   console.log(err);
		       });


		     var scale = new Plottable.Scales.Linear();
		     var colorScale = new Plottable.Scales.InterpolatedColor();
		     colorScale.range(["#BDCEF0", "#5279C7"]);
		     //var data = [{ val: 1 }, { val: 2 }, { val: 3 },
		     // { val: 4 }, { val: 5 }, { val: 6 }];

		     var plot = new Plottable.Plots.Pie()
			 .addDataset(new Plottable.Dataset(data))
			 .sectorValue(function(d) { return d.val; }, scale)
			 .attr("fill", function(d) { return d.val; }, colorScale)
			 .renderTo("svg#example");

		     window.addEventListener("resize", function() {
			 plot.redraw();
		     });
		 }]);

reimsControllers.controller(
    "NavBarCtrl", ["$scope",
		   function($scope) {
		       $scope.isCollapsed = true;

		       $scope.collapse = function() {
			   $scope.isCollapsed = true;
		       };
		   }]);

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
