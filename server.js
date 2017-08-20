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
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt')
mongoose.Promise = global.Promise;

// change this to your db
mongoose.connect('mongodb://localhost/vue-pass');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.options('*', cors());

// middle ware
app.use(expressJwt({ secret: 'test' }).unless({ path: ['/api/users'] }));
// let token = jwt.sign({ foo: 'bar' }, '3i&#V}Kh%Gji');

// Middle ware
// router.use(function (req, res, next) {
// 	if (req.headers.jwt !== "null" && req.headers.jwt !== undefined) {
// 		if (!helper.validateJWT(req.headers.jwt)) {
// 			res.status(401).send("Clear your cookies");
// 			return;
// 		}
// 	} else if (req.path !== "/users") {
// 		res.status(401).send('No JWT');
// 		return;
// 	}
//   	next();
// });

router.route('/users')
.post(function(req, res) {
	if (user.signUpCheck(req)) {
		user.create(req, res)
		.then(function(val){
			res.status(200).send(val);
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
				let token = jwt.sign({ username: val[0].Username, access: val[0].Access }, 'test')
				res.status(200).send(token);
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