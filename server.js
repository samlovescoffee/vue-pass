'use strict';

const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const bodyParser = require('body-parser');
const app = express();
const API = express.Router();
let User = require('./controllers/users');

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

app.use('/api', API);

app.listen(3001, function() {
	console.log('api running');
});

API.route('/users')
.post((req, res) => User.validate(req, res));

API.route('/userSearch')
.post((req, res) => User.find("Username", req.body.searchTerm, res));