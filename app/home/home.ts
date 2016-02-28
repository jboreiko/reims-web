/// <reference path="../_all.ts" />

module reimsApp.Home {
    "use strict";

    class HomeController {
	public static $inject = ["$scope", "EyeglassRecords"];
	constructor (private $scope: ng.IScope, private EyeglassRecords: any) {
	    console.log("Home controller", EyeglassRecords);

	    var data = [];
	    EyeglassRecords.localAllDocs({include_docs : true}).then(function(results) {
		angular.forEach(results.rows, function(row) {
		    // console.log(row);
		    if (row.doc.status) {
			if (data[row.doc.status]) {
			    data[row.doc.status].val++;
			} else {
			    data[row.doc.status] = { val: 1 };
			}
		    } else if (data["no status"]) {
			data["no status"].val++;
		    } else {
			data["no status"] = { val: 1 };
		    }
		});
		console.log("This is the data", data);
		var scale = new Plottable.Scales.Linear();
		var colorScale = new Plottable.Scales.InterpolatedColor();
		colorScale.range(["#BDCEF0", "#5279C7"]);
		var data = [{ val: 1 }, { val: 2 }, { val: 3 },
			    { val: 4 }, { val: 5 }, { val: 6 }];

		var plot = new Plottable.Plots.Pie()
		    .addDataset(new Plottable.Dataset(data))
		    .sectorValue(function(d) { return d.val; }, scale)
		    .attr("fill", function(d) { return d.val; }, colorScale)
		    .renderTo("svg#example");

		window.addEventListener("resize", function() {
		    plot.redraw();
		});
	    }).catch(function(err) {
		console.log(err);
	    });
	}
    }

    var app = angular.module("reimsApp.Home", []);
    app.controller("HomeCtrl", HomeController);
}
