'use strict';
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const user = require('./services/users');
const log = require('./services/logs');
const helper = require('./services/helper');
const cors = require('cors');
mongoose.Promise = global.Promise;

// change this to your db
mongoose.connect('mongodb://localhost/vue-pass');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.options('*', cors());
//router.use(jwt.init('8A05954E4B3CF069A7DE0343ED697FB44CAA5A2E18468118C38766AAF8ABE32085F4DD425DFE44DB4FE323B39578BA3E098542FEE3E16FBA987DEFFDBC4FEE34', {}));

router.route('/users')
.post(function(req, res) {
	if (user.signUpCheck(req)) {
		user.create(req, res)
		.then(function(val){
			//res.status(200).send(val);
			let newJWT = helper.createJWT(val[0]);
			res.status(200).send(newJWT);
		})
		.catch(function(err){
			log.error(err);
			if (err = 'User with this Email may already exist') {
				res.status(405).send(err);
			} else {
				res.status(500).send('Internal server error');
			}
			
		})
	} else {
		user.validate(req, res)
		.then(function(val){
			if (typeof val == 'object') {
				res.status(200).send(val);
			} else {
				res.status(401).send(val);
			}
		})
		.catch(function(err){
			log.error(err);
			res.status(500).send('Internal Server Error');
		});
	}
});

router.route('/userSearch')
.post(function(req, res) {
	user.find("Username", req.body.searchTerm, res)
	.then(function(val){
		res.send(val);
	})
	.catch(function(err){
		log.error(err);
		res.status(500).send('Internal Server Error');
	})
});

app.use('/api', cors(), router);

app.listen(3001, function() {
	console.log('api running');
});