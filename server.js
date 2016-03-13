var express = require('express');
var session = require('express-session');
var morgan = require('morgan'); // used for logging of http request
var path = require('path');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var app = express();

passport.use(new localStrategy (
    function(username, password, done) {
	console.log("Login attempt by", username);
	if (username === "reimswebmaster" && password === "thesecretpassword") {
	    return done(null, {username: "reimswebmaster", id: "1"});
	} else {
	    return done(null, false);
	}
    }
));

passport.serializeUser(function(user, cb) {
    console.log("Serializing user", user);
    cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
    console.log("Deserializing user from", id);
    cb(null, {username: "reimswebmaster", id: "1"});
});

app.use(morgan('combined'));
//app.use(require('cookie-parser')); // causes the whole server to freeze
app.use(require('body-parser').urlencoded({ extended: true}));
app.use(session({ secret: 'TODO changeme' }));

app.use(passport.initialize());
app.use(passport.session());

app.get('/login', function(req, res, next) {
    res.sendFile(path.join(__dirname + '/public/login.html'));
});

app.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login'}));

app.use('/', function(req, res, next) {
    console.log(req.url);
    if (req.user) {
	console.log("Authenticated access by", req.user.username);
	next();
    } else if (req.url.indexOf("bootstrap.") > -1) {
	console.log("Loading bootstrap for the login page");
	next();
    } else if (req.url.indexOf("jquery.js") > -1) {
	console.log("Loading jquery for the login page");
	next();
    } else if (req.url.indexOf("angular.js") > -1) {
	console.log("Loading angular for the login page");
	next();
    } else if (req.url.indexOf("login.js") > -1) {
	console.log("loading login app for the login page");
	next();
    } else {
	console.log("Illegal access attempted, sending over to login");
	res.redirect('/login');
    }
});

app.use('/', express.static(__dirname + '/public'));

// the first argument is the port
var server = app.listen(process.argv[2], function() {
    var host = server.address().address;
    var port = server.address().port;
    
    console.log('Reims app listening at http://%s:%s', host, port);
});
