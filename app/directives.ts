/// <reference path="_all.ts" />

module reimsApp {
    "use strict";

    var reimsDirectives = angular.module("reimsDirectives", [])
	.directive("reimsInputForm", inputForm)
	.directive("reimsNavBar", navBar);

    function inputForm(): ng.IDirective {
	return {
	    restrict: "E",
	    templateUrl: "partials/inputForm.html",
	};
    };

    function navBar(): ng.IDirective {
	return {
	    restrict: "E",
	    controller: "NavBarCtrl",
	    templateUrl: "partials/navBar.html"
	};
    };
}
