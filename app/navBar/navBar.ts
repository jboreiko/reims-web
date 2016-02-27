/// <reference path="../_all.ts" />

module reimsApp.NavBar {
    "use strict";

    function navBar(): ng.IDirective {
	return {
	    restrict: "E",
	    controller: "NavBarCtrl",
	    controllerAs: "Ctrl",
	    templateUrl: "partials/navBar.html"
	};
    };

    class NavBarController {
	public static $inject = ["$scope"];
	isCollapsed: boolean;

	constructor(private $scope: ng.IScope) {
	    this.isCollapsed = true;
	}

	toggleCollapse(): void {
	    this.isCollapsed = !this.isCollapsed;
	}

	collapse(): void {
	    this.isCollapsed = true;
	}
    }

    var reimsDirectives = angular.module("reimsApp.NavBar", [])
	.directive("reimsNavBar", navBar)
	.controller("NavBarCtrl", NavBarController);
}
