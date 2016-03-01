/// <reference path="_all.ts" />

module reimsApp.Directives {
    "use strict";

    var reimsDirectives = angular.module("reimsApp.Directives", [])
	.directive("reimsInputForm", inputForm)
	.directive("reimsResultRow", resultRow)
	.directive("reimsResultHeader", resultHeader);

    /* Bit of a hack, but directly reference the following construction here */
    export interface IOnSubmit {
	name: string;
	func(valid: boolean, terms: any): void;
    }

    function inputForm(): ng.IDirective {
	return {
	    restrict: "E",
	    templateUrl: "partials/inputForm.html",
	};
    };

    function resultRow(): ng.IDirective {
	return {
	    restrict: "A",
	    templateUrl: "partials/resultRow.html"
	};
    };

    function resultHeader(): ng.IDirective {
	return {
	    restrict: "A",
	    templateUrl: "partials/resultHeader.html"
	};
    };
}
