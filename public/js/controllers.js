'use strict';

/* Controllers */

var reimsControllers = angular.module('reimsControllers', []);

reimsControllers.controller('SearchCtrl', ['$scope',
  function($scope) {
    //$scope.phones = Phone.query();
    //$scope.orderProp = 'age';
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
