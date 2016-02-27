/// <reference path="_all.ts" />

module reimsApp.Filters {
    "use strict";

    export var app = angular.module("reimsApp.Filters", [])
	.filter("eyeglassTypeFilter", eyeglassType)
	.filter("eyeglassGenderFilter", eyeglassGender)
	.filter("eyeglassTintFilter", eyeglassTint)
	.filter("eyeglassSizeFilter", eyeglassSize)
	.filter("eyeglassMaterialFilter", eyeglassMaterial);

    interface StringFilter {
	(input: string) : string;
    }

    function eyeglassType(): StringFilter {
	return function(input: string) {
	    if (input === "B") { return "Bifocal"; }
	    if (input === "S") { return "Single"; }
	    if (input === "R") { return "Reader"; }
	};
    };

    function eyeglassGender(): StringFilter {
	return function(input: string) {
	    if (input === "M") { return "Male"; }
	    if (input === "F") { return "Female"; }
	    if (input === "U") { return "Unisex"; }
	};
    };

    function eyeglassTint(): StringFilter {
	return function(input: string) {
	    if (input === "N") { return "None"; }
	    if (input === "L") { return "Light"; }
	    if (input === "D") { return "Dark"; }
	};
    };

    function eyeglassSize(): StringFilter {
	return function(input: string) {
	    if (input === "C") { return "Child"; }
	    if (input === "S") { return "Small"; }
	    if (input === "M") { return "Medium"; }
	    if (input === "L") { return "Large"; }
	};
    };

    function eyeglassMaterial(): StringFilter {
	return function(input: string) {
	    if (input === "M") { return "Metal"; }
	    if (input === "P") { return "Plastic"; }
	};
    };
}
