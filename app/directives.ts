/// <reference path="_all.ts" />
"use strict";

var reimsDirectives = angular.module("reimsDirectives", []);

reimsDirectives.directive("reimsInputForm", [function() {
    return {
	restrict: "E",
	templateUrl: "partials/inputForm.html",
    };
}]);

reimsDirectives.directive("reimsNavBar", [function() {
    return {
	restrict: "E",
	controller: "NavBarCtrl",
	templateUrl: "partials/navBar.html"
    };
}]);
