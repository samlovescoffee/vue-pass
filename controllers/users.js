let User = require('../model/users');
let passwordHash = require('password-hash');
let Log = require('./logs');
let Helper = require('./helper');
const mongoose = require('mongoose');
let users = mongoose.model('User','users');

const user = {
	create: function createNewUser(req) {
			let user = new User();
			user.Email = req.body.email;
			user.Password = passwordHash.generate(req.body.password);
			user.CreatedDate = new Date();
			user.Username = req.body.username;

			if (!user.Email === 'sam@intravenous.coffee' && !user.Email === 'elise_t92@hotmail.com') {
				user.Access = 'User';
			} else {
				user.Access = 'Admin';
			}

			user.save(function(err) {
				if (err) {
					Log.error(err);
				} else {
					Log.audit(user.Email, 'New user created');
				}
			});
	},

	find: function finder(col, searchTerm, res) {
		users.find({ [col]: searchTerm }, function(err, data) {
			if(err) {
				Log.error(err);
			} else {
				return new Promise ((resolve, reject) => {
					let userStore = {};
					for(let i = 0; i < data.length; i++) {
						let name = data[i]['_doc']['_id'];
						userStore[name] = data[i]['_doc'];
					}
					resolve(res.send(userStore));
				});
			}
		});
	},

	validate: function handleSubmission(req, res) {
		users.find({'Email': req.body.email}, function(err, data) {
			if (err) {
				Log.error(err);

			} else if (data.length === 0) {
				if (Helper.validatePassword(req.body.password) && Helper.validateEmail(req.body.email)) {
					user.create(req);
				} else {
					let dangerousRequest = 'User with email: ' + req.body.email + ' made a User post request without form validation';
					Log.error(dangerousRequest);
				}

			} else if (passwordHash.verify(req.body.password, data[0].Password)) {
				Log.audit(req.body.email, 'Successful log in request');
				res.status(200).end();
			} else {
				Log.audit(req.body.email, 'Unsuccessful log in');
				res.status(401).end();
			}

			if (typeof dangerousRequest != 'undefined') {
				Log.error(dangerousRequest);
			}
		
		});
	}
	
};
module.exports = user;