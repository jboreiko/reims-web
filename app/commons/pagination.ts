/// <reference path="../_all.ts" />

module reimsApp.Pagination {
    "use strict";

    export class Paginator {
	private currentOffset: number = 0;
	constructor(private $scope, private $filter, private records: any, private pageSize: number = 20) {}

	getNextPage(): any {
	    var promise = this.records.localAllDocs({include_docs: true, limit: this.pageSize, skip: this.currentOffset});
	    this.currentOffset += this.pageSize;
	    return promise;
	}
    }
}
