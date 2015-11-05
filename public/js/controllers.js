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

		     $scope.docCount = "unknown"
		     
		     EyeglassRecords.localInfo().then(function(info) {
			 console.log("Doc count is ", info.doc_count);
			 $scope.docCount = info.doc_count;
		     });

		     $scope.$watch(EyeglassRecords, function (newVal, oldVal) {
			 console.log(newVal, oldVal)
			 if (typeof newVal !== 'undefined') {
			     $scope.syncState = newVal.syncState
			 }
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
