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

		     $scope.syncState = "unknown"
		     $rootScope.$on("sync:pause", function(event, data) {
			 console.log("Controller: pause")
			 $scope.syncState = "pause"
		     })
		     $rootScope.$on("sync:change", function(event, data) {
			 $scope.syncState = "changing"
		     })

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
