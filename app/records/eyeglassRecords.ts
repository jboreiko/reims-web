/// <reference path="../_all.ts" />

namespace reimsApp.EyeglassRecords {
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
            const database_name = "eyeglasses";
            console.log("EyeglassRecords services");

            this.localDB = pouchDB(database_name);
            console.log("Opened local database ", this.localDB);

            this.remoteDB = pouchDB("http://localhost:5984/" + database_name);
            console.log("Opened remote database ", this.remoteDB);

            const syncManager = this.localDB.sync(this.remoteDB, {
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
            const statusIndex = {
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

        fullSearch(terms: any, callback: (any)) {
            this.getByStatus("filed").then((results) => {
                angular.forEach(results.rows, (row) => {
                    console.log("Eyeglasses running full search", row, terms);
                    // abs(od_sphere-?) + abs(os_sphere-?) SPHERE_RANK,
                    const SPHERE_RANK = Math.abs(row.doc.odsphere - (terms.odsphere || 0)) +
                    Math.abs(row.doc.ossphere - (terms.ossphere || 0));
                    // abs(IFNULL(od_cylinder,0)-?) + abs(IFNULL(os_cylinder,0)-?) CYLINDER_RANK,
                    const CYLINDER_RANK = Math.abs(row.doc.odcylinder - (terms.odcylinder || 0)) +
                    Math.abs(row.doc.oscylinder - (terms.oscylinder || 0));

                    // abs( (IFNULL(od_cylinder,0)/2 + od_sphere) - (?*0.5+?) ) +
                    // abs( (IFNULL(os_cylinder,0)/2 + os_sphere) - (?*0.5+?) ) SPHERICAL_EQ_RANK,
                    const OD_SPHERICAL_EQ_RANK = Math.abs((row.doc.odcylinder || 0) / 2.0 + (1 * row.doc.odsphere)) -
                    ((terms.odcylinder || 0) * 0.5 + (terms.odsphere || 0));
                    const OS_SPHERICAL_EQ_RANK = Math.abs((row.doc.oscylinder || 0) / 2.0 + (1 * row.doc.ossphere)) -
                    ((terms.oscylinder || 0) * 0.5 + (terms.ossphere || 0));
                    const SPHERICAL_EQ_RANK = OD_SPHERICAL_EQ_RANK + OS_SPHERICAL_EQ_RANK;

                    // abs(IFNULL(od_add,0)- 1.00)  + abs(IFNULL(os_add,0)- 1.00) ADD_RANK,
                    const ADD_RANK = Math.abs((row.doc.odadd || 0) - 1.0) + Math.abs((row.doc.osadd || 0) - 1.0);

                    // (1*IFNULL(SPHERE_RANK,0) + 1*IFNULL(CYLINDER_RANK,0) + 2*IFNULL(SPHERICAL_EQ_RANK,0) + 1*IFNULL(ADD_RANK,0))/5 BIG_RANK
                    // (1*IFNULL(SPHERE_RANK,0) + 1*IFNULL(CYLINDER_RANK,0) + 1*IFNULL(SPHERICAL_EQ_RANK,0) + 1*IFNULL(ADD_RANK,0))/4 BIG_RANK2
                    const RANK = SPHERE_RANK + CYLINDER_RANK + 2 * SPHERICAL_EQ_RANK + (ADD_RANK / 5);

                    console.log(SPHERE_RANK, CYLINDER_RANK, SPHERICAL_EQ_RANK, ADD_RANK, RANK);
                    row.doc.score = RANK;
                });
                callback(results);
            });
        }

        getStatusHist() {
            // create a design doc
            const ddoc = {
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

    const app = angular.module("reimsApp.EyeglassRecords", ["pouchdb"])
    .service("EyeglassRecords", EyeglassRecords);
}

