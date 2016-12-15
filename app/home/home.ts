/// <reference path="../_all.ts" />

namespace reimsApp.Home {
    "use strict";

    class HomeController {
        public static $inject = ["$scope", "EyeglassRecords"];
        constructor (private $scope: ng.IScope, private EyeglassRecords: any) {
            console.log("Home controller", EyeglassRecords);

            const hist = EyeglassRecords.getStatusHist();

            console.log("hist");

            EyeglassRecords.getStatusHist().then(function(results) {
                const scale = new Plottable.Scales.Linear();
                const colorScale = new Plottable.Scales.InterpolatedColor();
                colorScale.range(["#BDCEF0", "#5279C7"]);
                // var data = [{ value: 1 }, { value: 2 }, { value: 3 },
                //        { value: 4 }, { value: 5 }, { value: 6 }];
                const data = results.rows;

                console.log(data);

                const plot = new Plottable.Plots.Pie()
                    .addDataset(new Plottable.Dataset(data))
                    .sectorValue(function(d) { return d.value; }, scale)
                    .innerRadius(90)
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

    const app = angular.module("reimsApp.Home", []);
    app.controller("HomeCtrl", HomeController);
}
