'use strict';

/* Services */

var reimsServices = angular.module('reimsServices', ['pouchdb']);

reimsServices.service('EyeglassRecords', ['pouchDB', '$rootScope', function(pouchDB, $rootScope) {
    console.log("EyeglassRecords services");
    var localDB = pouchDB('eyeglasses')
    console.log("Opened local database ", localDB);
    var remoteDB = pouchDB('http://localhost:5984/eyeglasses')
    console.log("Opened remote database ", remoteDB);

    var syncManager = localDB.sync(remoteDB, {
	live: true,
	retry: true
    })

    syncManager.on('change', function (change) {
	// yo, something changed!
	console.log("Something changed", change);
	$rootScope.$broadcast("sync:change", change)
    }).on('paused', function (info) {
	// replication was paused, usually because of a lost connection
	console.log("Replication paused", info)
	$rootScope.$broadcast("sync:pause", info)
    }).on('active', function (info) {
	// replication was resumed
	console.log("Replication back online", info)
	$rootScope.$broadcast("sync:active", info)
    }).on('error', function (err) {
	// totally unhandled error (shouldn't happen)
	console.log("Replicaiton catastrophically failed", err)
	$rootScope.$broadcast("sync:failure", info)	
    }).on('complete', function(err) {
	console.log("The sync has ended")
	$rootScope.$broadcast("sync:down", info)
    });

    
    return {
	localInfo : function() { return localDB.info() },
    }
}]);
