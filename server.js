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
const cors = require('cors')

// change this to your db
mongoose.connect('mongodb://localhost/vue-pass');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', cors(), router);
app.options('*', cors());

// Middle ware
router.use(function (req, res, next) {
	console.log('Time:', Date.now());
	if (req.headers.jwt !== 'null') {
		console.log('Valid');
	} else {
		console.log('Invalid');
	}
  	next();
});

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