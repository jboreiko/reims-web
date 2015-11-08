'use strict';

/* Filters.js */

var reimsFilters = angular.module('reimsFilters', []);

reimsFilters.filter('quickSearchFilter', [function() {
    return function(input, predicate) {
	console.log(input, predicate)
	return (input.doc.material != predicate.material)
    }
}]);
