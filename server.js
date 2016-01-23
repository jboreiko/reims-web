var express = require('express');
var morgan = require('morgan'); // used for logging of http request
var app = express();

app.use(morgan('combined'));

app.use('/', express.static(__dirname + '/public'));

var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Reims app listening at http://%s:%s', host, port);
    });
