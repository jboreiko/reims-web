/// <reference path="../_all.ts" />

module reimsApp.EyeglassRecords {
    "use strict";

    class EyeglassRecords {
	public static $inject: string[] = ["pouchDB", "$rootScope"];
	private localDB: any;
	private remoteDB: any;

	constructor(private pouchDB: any, $rootScope: any) {
	    var database_name = "eyeglasses";
	    console.log("EyeglassRecords services");

	    this.localDB = pouchDB(database_name);
	    console.log("Opened local database ", this.localDB);

	    this.remoteDB = pouchDB("http://localhost:5984/" + database_name);
	    console.log("Opened remote database ", this.remoteDB);

	    var syncManager = this.localDB.sync(this.remoteDB, {
		live: true,
		retry: true
	    });

	    syncManager.on("change", function (change) {
		// yo, something changed!
		console.log("Something changed", change);
		$rootScope.$broadcast("sync:change", change);
	    }).on("paused", function (info) {
		// replication was paused, usually because of a lost connection
		console.log("Replication paused", info);
		$rootScope.$broadcast("sync:pause", info);
	    }).on("active", function (info) {
		// replication was resumed
		console.log("Replication back online", info);
		$rootScope.$broadcast("sync:active", info);
	    }).on("error", function (err) {
		// totally unhandled error (shouldn"t happen)
		console.log("Replicaiton catastrophically failed", err);
		$rootScope.$broadcast("sync:failure", err);
	    }).on("complete", function(err) {
		console.log("The sync has ended");
		$rootScope.$broadcast("sync:down", err);
	    });
	}

	localInfo() {
	    return this.localDB.info();
	}

	remoteInfo() {
	    return this.remoteDB.info();
	}

	localAllDocs(opts: any) {
	    return this.localDB.allDocs(opts);
	}

	updateDocStatus(doc: any, status: string) {
	    console.log("Updating status to ", status, doc);
	    doc.status = status;
	    this.localDB.put(doc).then(function(res) {
		console.log(res);
	    }).catch(function(err){
		console.error(err);
	    });
	}
    };

    var app = angular.module("reimsApp.EyeglassRecords", ["pouchdb"])
	.service("EyeglassRecords", EyeglassRecords);
}

