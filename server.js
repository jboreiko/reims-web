var express = require('express');
var app = express();

app.use('/', express.static(__dirname + '/public'));

// GET method route
app.get('/', function (req, res) {
	res.send('GET request to the homepage');
    });

// POST method route
app.post('/', function (req, res) {
	res.send('POST request to the homepage');
    });

var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Reims app listening at http://%s:%s', host, port);
    });