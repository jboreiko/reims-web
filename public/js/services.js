'use strict';

/* Services */

var reimsServices = angular.module('reimsServices', ['pouchdb']);

reimsServices.service('EyeglassRecords', ['pouchDB', function(pouchDB) {
    console.log("EyeglassRecords services");
    var localDB = pouchDB('eyeglasses')
    console.log("Opened local database ", localDB);
    var remoteDB = pouchDB('http://localhost:5984/eyeglasses')
    console.log("Opened remote database ", remoteDB);

    var syncState = "not connected"
    
    localDB.sync(remoteDB, {
	live: true,
	retry: true
    }).on('change', function (change) {
	// yo, something changed!
	console.log("Something changed", change);
    }).on('paused', function (info) {
	// replication was paused, usually because of a lost connection
	console.log("Replication paused", info)
	syncState = "paused"
    }).on('active', function (info) {
	// replication was resumed
	console.log("Replication back online", info)
    }).on('error', function (err) {
	// totally unhandled error (shouldn't happen)
	console.log("Replicaiton catastrophically failed", err)
    }).on('complete', function(err) {
	console.log("We are currently in sync!")
	syncState = "in sync"
    });

    
    return {
	localInfo : function() { return localDB.info() },
	syncState : syncState
    }
}]);
