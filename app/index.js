// External
var angular = require('angular');
require('angular-route');
require('angular-pouchdb');
require('angular-bootstrap');
require('pouchdb');
require('bootstrap');
require('jquery');

// Local 
require('../build/app.js');
require('../build/controllers.js');
require('../build/services.js');
require('../build/filters.js');

window.addEventListener("load", function () {
    // props to everyone who gets this reference
    console.log("THERE IS ANOTHER SYSTEM");
});
