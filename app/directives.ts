/// <reference path="_all.ts" />
"use strict";

var reimsDirectives = angular.module("reimsDirectives", []);

reimsDirectives.directive("reimsInputForm", [function() {
    return {
	restrict: "E",
	templateUrl: "partials/inputForm.html"
    };
}]);
