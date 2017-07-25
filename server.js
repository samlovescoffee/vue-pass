'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const port = process.env.API_PORT || 3001;
let passwordHash = require('password-hash');
let Log = require('./controllers/logs');
let User = require('./controllers/users');
let users = mongoose.model('User','users');

//now we should configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Credentials', 'true');
	res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
	//and remove caching so we get the most recent users
	res.setHeader('Cache-Control', 'no-cache');
	next();
});

// change this to your db
mongoose.connect('mongodb://localhost/vue-pass');

router.get('/', function(req, res) {
	res.json({ message: 'API Initialized!'});
});

app.use('/api', router);

app.listen(port, function() {
	console.log('api running on port ', port);
});

let currentUsers = {

};

router.route('/users')
.post(function(req, res) {
	// handle user sign in/sign up
	users.find({'Email': req.body.email}, function(err, data) {
		if (err) {
			Log.error(err);

		} else if (data.length === 0) {
			if (User.validatePassword(req.body.password) && User.validateEmail(req.body.email)) {
				User.create(req);
			} else {
				let dangerousRequest = 'User with email: ' + req.body.email + ' made a User post request without form validation';
				Log.error(dangerousRequest);
			}

		} else if (passwordHash.verify(req.body.password, data[0].Password)) {
			Log.audit(req.body.email, 'Successful log in request');
		} else {
			Log.audit(req.body.email, 'Unsuccessful log in');
		}

		if (typeof dangerousRequest != 'undefined') {
			Log.error(dangerousRequest);
		}
	
	});
});

router.route('/userSearch')
.post(function(req, res) {
	let result = User.find(req.body.username);
	res.send(result);
});