'use strict';

/* Services */

var reimsServices = angular.module('reimsServices', ['pouchdb']);

reimsServices.service('EyeglassRecords', ['pouchDB', function(pouchDB) {
    console.log("EyeglassRecords services");
    var db = pouchDB('eyeglasses')
    console.log("Opened local database ", db);

    return {
	db : db,
	info : function() { return db.info() }
    }
}]);
