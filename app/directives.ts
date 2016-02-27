/// <reference path="_all.ts" />

module reimsApp.Directives {
    "use strict";

    var reimsDirectives = angular.module("reimsApp.Directives", [])
	.directive("reimsInputForm", inputForm)
	.directive("reimsNavBar", navBar);

    /* Bit of a hack, but directly reference the following construction here */
    export interface IOnSubmit {
	name: string;
	func(terms: string): void;
    }

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
