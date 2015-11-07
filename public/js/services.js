'use strict';

/* Services */

var reimsServices = angular.module('reimsServices', ['pouchdb']);

reimsServices.service('EyeglassRecords', ['pouchDB', function(pouchDB) {
    console.log("EyeglassRecords services");
    var localDB = pouchDB('eyeglasses')
    console.log("Opened local database ", localDB);
    var remoteDB = pouchDB('http://localhost:5984/eyeglasses')
    console.log("Opened remote database ", remoteDB);

    var syncManager = localDB.sync(remoteDB, {
	live: true,
	retry: true
    })
    
    return {
	localInfo : function() { return localDB.info() },
	syncManager : syncManager
    }
}]);
