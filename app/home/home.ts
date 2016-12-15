/// <reference path="../_all.ts" />

module reimsApp.Home {
    "use strict";

    class HomeController {
    public static $inject = ["$scope", "EyeglassRecords"];
    constructor (private $scope: ng.IScope, private EyeglassRecords: any) {
        console.log("Home controller", EyeglassRecords);

        var hist = EyeglassRecords.getStatusHist();

        console.log("hist");

        EyeglassRecords.getStatusHist().then(function(results) {
        var scale = new Plottable.Scales.Linear();
        var colorScale = new Plottable.Scales.InterpolatedColor();
        colorScale.range(["#BDCEF0", "#5279C7"]);
        //var data = [{ value: 1 }, { value: 2 }, { value: 3 },
        //        { value: 4 }, { value: 5 }, { value: 6 }];
        var data = results.rows;

        console.log(data);

        var plot = new Plottable.Plots.Pie()
            .addDataset(new Plottable.Dataset(data))
            .sectorValue(function(d) { return d.value; }, scale)
            .attr("fill", function(d) { return d.value; }, colorScale)
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
