var express = require('express');
var session = require('express-session');
var morgan = require('morgan'); // used for logging of http request
var path = require('path');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var app = express();

passport.use(new localStrategy (
    function(username, password, done) {
	console.log("Username: " + username + " Password: " + password);
	if (username === "test") {
	    return done(null, {name: "jboreiko", id: "123"});
	} else {
	    return done(null, false);
	}
    }
));

passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
    cb(null, {name: "jboreiko", id: "123"});
});

app.use(morgan('combined'));
//app.use(require('cookie-parser'));
//app.use(require('body-parser'));
app.use(session({ secret: 'TODO changeme' }));

app.use(passport.initialize());
app.use(passport.session());

app.get('/login', function(req, res, next) {
    res.sendFile(path.join(__dirname + '/public/login.html'));
});

app.post('/login',
	 passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login'}));

app.use('/', function(req, res, next) {
    if (req.isAuthenticated() || req.isAuthenticated) {
	next();
    } else {
	console.log("Pushing over to login");
	res.redirect('/login');
    }
});

app.use('/', express.static(__dirname + '/public'));

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    
    console.log('Reims app listening at http://%s:%s', host, port);
});
