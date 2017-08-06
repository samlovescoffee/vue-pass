'use strict';

const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
let User = require('./controllers/users');
let Log = require('./controllers/logs');
let helper = require('./controllers/helper');

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

// Middle ware
router.use('/', function (req, res, next) {
  	console.log('Time:', Date.now());
  	next();
});

app.use('/api', router);

app.listen(3001, function() {
	console.log('api running');
});

router.route('/users')
.post(function(req, res) {
	if (User.signUpCheck(req)) {
		User.create(req, res)
		.then(function(val){
			//res.status(200).send(val);
			let newJWT = helper.createJWT(val[0]);
			res.status(200).send(newJWT);
		})
		.catch(function(err){
			Log.error(err);
			if (err = 'User with this Email may already exist') {
				res.status(405).send(err);
			} else {
				res.status(500).send('Internal server error');
			}
			
		})
	} else {
		User.validate(req, res)
		.then(function(val){
			if (typeof val == 'object') {
				//res.status(200).send(val);
				let newJWT = helper.createJWT(val[0]);
				res.status(200).send(newJWT);
			} else {
				res.status(401).send(val);
			}
		})
		.catch(function(err){
			Log.error(err);
			res.status(500).send('Internal Server Error');
		});
	}
});

router.route('/userSearch')
.post(function(req, res) {
	User.find("Username", req.body.searchTerm, res)
	.then(function(val){
		res.send(val);
	})
	.catch(function(err){
		Log.error(err);
		res.status(500).send('Internal Server Error');
	})
});