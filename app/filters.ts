'use strict';

/* Filters.js */

var reimsFilters = angular.module('reimsFilters', []);

reimsFilters.filter('eyeglassTypeFilter', [function() {
    return function(input) {
	if (input === "B") return "Bifocal"
	if (input === "S") return "Single"
	if (input === "R") return "Reader"
    }
}]);

reimsFilters.filter('eyeglassGenderFilter', [function() {
    return function(input) {
	if (input === "M") return "Male"
	if (input === "F") return "Female"
	if (input === "U") return "Unisex"
    }
}]);

reimsFilters.filter('eyeglassTintFilter', [function() {
    return function(input) {
	if (input === "N") return "None"
	if (input === "L") return "Light"
	if (input === "D") return "Dark"
    }
}]);

reimsFilters.filter('eyeglassSizeFilter', [function() {
    return function(input) {
	if (input === "C") return "Child"
	if (input === "S") return "Small"
	if (input === "M") return "Medium"
	if (input === "L") return "Large"	
    }
}]);

reimsFilters.filter('eyeglassMaterialFilter', [function() {
    return function(input) {
	if (input === "M") return "Metal"
	if (input === "P") return "Plastic"
    }
}]);
