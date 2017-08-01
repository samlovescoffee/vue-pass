let User = require('../model/users');
let passwordHash = require('password-hash');
let Log = require('./logs');
let Helper = require('./helper');
const mongoose = require('mongoose');
let users = mongoose.model('User','users');

const user = {
	signUpCheck: function(req) {
		if(req.body.signUp === "true") {
			return true;
		} else {
			return false;
		}
	},
	create: function createUser(req, res) {
		return new Promise ((resolve, reject) => {
			user.find('Email', req.body.email)
			.then(function(val, res){
				if (val.length === 0 && Helper.validatePassword(req.body.password) && Helper.validateEmail(req.body.email)) {
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
							reject(err);
						} else {
							Log.audit(newUser.Email, 'New user created');
						}
					})
					.then(function(val){
						resolve(user.find('Email', req.body.email));
						Log.audit('Successful sign up with email: ' + req.body.email);
					})
					.catch(function(err){
						Log.error(err);
					});
				} else {
					let dangerousRequest = 'User with email: ' + req.body.email + ' made a User post request without form validation, or tried to sign up using existing credentials';
					Log.error(dangerousRequest);
					reject(dangerousRequest);
				}
			})
			.catch(function(error){
				Log.error(error);
			});
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
		return new Promise ((resolve, reject) => {
			user.find('Email', req.body.email)
			.then(function(val){
				if (val.length === 0) {
					resolve('User exists');
				} else {
					if (passwordHash.verify(req.body.password, val[0].Password)) {
						Log.audit(req.body.email, 'Successful log in request');
						resolve(val);
					} else {
						Log.audit(req.body.email, 'Unsuccessful log in');
						resolve('Unsuccessful log in')
					}
				}
			})
			.catch(function(err){
				reject(err);
				Log.error(err);
			});
		});
	}
	
};
module.exports = user;