const User = require('../model/users');
const passwordHash = require('password-hash');
const log = require('./logs');
const helper = require('./helper');
const mongoose = require('mongoose');
const MongooseUsers = mongoose.model('User','users');

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
				if (val.length === 0 && helper.validatePassword(req.body.password) && helper.validateEmail(req.body.email)) {
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
							log.error(err);
							reject(err);
						} else {
							log.audit(newUser.Email, 'New user created');
						}
					})
					.then(function(val){
						resolve(user.find('Email', req.body.email));
						log.audit('Successful sign up with email: ' + req.body.email);
					})
					.catch(function(err){
						log.error(err);
					});
				} else {
					reject('User with this email may already exist');
				}
			})
			.catch(function(error){
				log.error(error);
			});
		});
	},
	find: function finder(col, searchTerm, res) {
		return new Promise ((resolve, reject) => {
			MongooseUsers.find({ [col]: searchTerm }, function(err, data) {
				if(err) {
					log.error(err);
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
					resolve('User does not exist');
				} else {
					if (passwordHash.verify(req.body.password, val[0].Password)) {
						log.audit(req.body.email, 'Successful log in request');
						resolve(true);
					} else {
						log.audit(req.body.email, 'Unsuccessful log in');
						resolve('Unsuccessful log in')
					}
				}
			})
			.catch(function(err){
				reject(err);
				log.error(err);
			});
		});
	}
	
};
module.exports = user;