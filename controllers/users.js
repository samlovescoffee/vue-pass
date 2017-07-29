let User = require('../model/users');
let passwordHash = require('password-hash');
let Log = require('./logs');
let Helper = require('./helper');
const mongoose = require('mongoose');
let users = mongoose.model('User','users');

const user = {
	create: function createUser(req) {
			let newUser = new User();
			newUser.Email = req.body.email;
			newUser.Password = passwordHash.generate(req.body.password);
			newUser.CreatedDate = new Date();
			newUser.Username = req.body.username;

			if (!['sam@intravenous.coffee', 'elise_t92@hotmail.com'].includes(newUser.Email)) {
				newUser.Access = 'User';
			} else {
				newUser.Access = 'Admin';
			}

			newUser.save(function(err) {
				if (err) {
					Log.error(err);
				} else {
					Log.audit(newUser.Email, 'New user created');
				}
			});
	},

	find: function finder(col, searchTerm, res) {
		return new Promise ((resolve, reject) => {
			users.find({ [col]: searchTerm }, function(err, data) {
				if(err) {
					Log.error(err);
					reject(err);
				} else {
					resolve(data);
				}
			});
		});
	},

	validate: function handleSubmission(req, res) {
		user.find('Email', req.body.email)
		.then(function(val){
			let userArr = [];

			if (val.length === 0) {
				if (Helper.validatePassword(req.body.password) && Helper.validateEmail(req.body.email)) {
					user.create(req);
				} else {
					let dangerousRequest = 'User with email: ' + req.body.email + ' made a User post request without form validation';
					Log.error(dangerousRequest);
				}
			} else {
				if (passwordHash.verify(req.body.password, val[0].Password)) {
					Log.audit(req.body.email, 'Successful log in request');
					res.status(200).send(val[0]);
				} else {
					Log.audit(req.body.email, 'Unsuccessful log in');
					res.status(401).end();
				}
				if (typeof dangerousRequest != 'undefined') {
					Log.error(dangerousRequest);
				}
			}
		})
		.catch(function(err){
			Log.error(err);
		});
	}
	
};
module.exports = user;