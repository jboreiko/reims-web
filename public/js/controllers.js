'use strict';

/* Controllers */

var reimsControllers = angular.module('reimsControllers', []);

reimsControllers.controller(
    'SearchCtrl', ['$scope', '$location', 'EyeglassRecords',
		   function($scope, $location, EyeglassRecords) {
		       $scope.searchTerms = {}
		       
		       EyeglassRecords.localAllDocs({include_docs : true}).then(function(results) {
			   $scope.allResultRows = results.rows
                           $scope.allResultRowsDisplayed = [].concat($scope.allResultRows);
		       }).catch(function(err) {
			   console.log(err)
		       });
		       
		       $scope.search = function(searchTerms) {
			   console.log("Running a search with ", searchTerms);
			   $location.path("/results");
		       };

		       $scope.dispense = function(id) {
			   console.log("Dispensing", id)
		       };

		       $scope.markAsMissing = function(id) {
			   console.log("Marking as missing", id)
		       };

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
			 $scope.syncState = "pause"
			 updateCount()
		     })
		     $rootScope.$on("sync:change", function(event, data) {
			 $scope.syncState = "changing"
 			 updateCount()
		     })


		     var updateCount = function()
		     {
			 EyeglassRecords.localInfo().then(function(info) {
			     console.log("Doc count is ", info.doc_count);
			     $scope.docCount = info.doc_count;
			 });
		     }
		     updateCount()

		 }]);

/*
phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
  function($scope, $routeParams, Phone) {
    $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
      $scope.mainImageUrl = phone.images[0];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    };
  }]);
*/
