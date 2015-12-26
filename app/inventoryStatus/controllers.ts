/// <reference path="../_all.ts" />
"use strict";

var inventoryStatusModule: angular.IModule = angular.module("reimsInventoryStatus", []);

inventoryStatusModule.controller(
    "InventoryStatusCtrl", ["$scope", "EyeglassRecords",
			    function($scope: angular.IScope, EyeglassRecords) {
				console.log("Inventory controller");
			    }]);
