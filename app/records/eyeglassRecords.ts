/// <reference path="../_all.ts" />

module reimsApp.EyeglassRecords {
    "use strict";

    export interface IEyeglassRecord {
	sku: string;
	type: string;
	gender: string;
	size: string;
	tint: string;
	material: string;
	entrydate: string;
	odsphere: number;
	odcylinder: number;
	odaxis: number;
	odadd: number;
	ossphere: number;
	oscylinder: number;
	osaxis: number;
	osadd: number;
	status?: string;
    }

    interface IEyeglassDoc extends IEyeglassRecord {
	_id: string;
	_rev: string;
    }

    export class EyeglassRecords {
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

	addRecord(terms: IEyeglassRecord): any {
	    console.log(terms);

	    terms.status = "unfiled";

	    // input without caring about id
	    return this.localDB.post(terms);
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

	updateRowsStatus(rows: any[], status: string) {
	    angular.forEach(rows, (row) => {
		this.updateDocStatus(row.doc, status);
	    });
	}

	deleteRows(rows: any[]) {
	    angular.forEach(rows, (row) => {
		this.updateDocStatus(row.doc, "deleted");
	    });
	}

	getByStatus(status: string) {
	    var statusIndex = {
		_id: "_design/status_index",
		views: {
		    by_status: {
			map: function emitStatus(doc) {
			    if (doc.status) {
				emit(doc.status);
			    } else {
				emit("no status");
			    }
			}.toString()
		    }
		}
	    };

	    this.localDB.put(statusIndex).then(function() {
		console.log("created index");
	    }).catch(function(err) {
		if (err.status !== 409) {
		    console.error(err);
		}
		console.log("index already installed");
	    });

	    return this.localDB.query("status_index/by_status", {
		key: status,
		include_docs: true
	    });
	}

	getStatusHist() {
	    // create a design doc
	    var ddoc = {
		_id: "_design/index",
		views: {
		    index: {
			map: function mapFun(doc) {
			    if (doc.status) {
				emit(doc.status);
			    } else {
				emit("no status");
			    }
			}.toString(),
			reduce: "_count"
		    }
		}
	    };

	    // save the design doc
	    this.localDB.put(ddoc).catch(function (err) {
		if (err.status !== 409) {
		    throw err;
		}
		// ignore if doc already exists
	    }).then(function() {
		// find docs where title === "Lisa Says"
	    }).then(function (result) {
		// handle result
	    }).catch(function (err) {
		console.log(err);
	    });
	    return this.localDB.query("index", {
		keys: ["dispensed", "missing", "filed", "unfiled"],
		group: true
	    });
	}
    };

    var app = angular.module("reimsApp.EyeglassRecords", ["pouchdb"])
	.service("EyeglassRecords", EyeglassRecords);
}

