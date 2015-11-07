'use strict';

/* Controllers */

var reimsControllers = angular.module('reimsControllers', []);

reimsControllers.controller(
    'SearchCtrl', ['$scope', '$location',
		   function($scope, $location) {
		       $scope.search = function(searchTerms) {
			   console.log("Running a search with ", searchTerms);
			   $location.path("/results");
		       };
		   }]);

reimsControllers.controller(
    'HomeCtrl', ['$scope', 'EyeglassRecords',
		 function($scope, EyeglassRecords) {
		     console.log("Home controller", EyeglassRecords);

		 }]);

reimsControllers.controller(
    'SyncCtrl', ['$scope', 'EyeglassRecords',
		 function($scope, EyeglassRecords) {
		     console.log("Sync controller")

		     $scope.syncState = "unknown"

		     EyeglassRecords.syncManager.on('change', function (change) {
			 // yo, something changed!
			 console.log("Something changed", change);
		     }).on('paused', function (info) {
			 // replication was paused, usually because of a lost connection
			 console.log("Replication paused", info)
			 $scope.syncState = "paused"
		     }).on('active', function (info) {
			 // replication was resumed
			 console.log("Replication back online", info)
		     }).on('error', function (err) {
			 // totally unhandled error (shouldn't happen)
			 console.log("Replicaiton catastrophically failed", err)
		     }).on('complete', function(err) {
			 console.log("We are currently in sync!")
			 $scope.syncState = "down"
		     });

     		     $scope.docCount = "unknown"
		     EyeglassRecords.localInfo().then(function(info) {
			 console.log("Doc count is ", info.doc_count);
			 $scope.docCount = info.doc_count;
		     });


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
