let User = require('../model/users');
let passwordHash = require('password-hash');
let Log = require('./logs');
const mongoose = require('mongoose');
let users = mongoose.model('User','users');

const user = {
	create: function createNewUser(req) {
			let user = new User();
			user.Email = req.body.email;
			console.log(req.body.password);
			user.Password = passwordHash.generate(req.body.password);
			user.CreatedDate = new Date();
			user.Username = req.body.username;

			if (user.Email === 'sam@intravenous.coffee' || user.Email === 'elise_t92@hotmail.com') {
				user.Access = 'Admin';
			} else {
				user.Access = 'User';
			}

			user.save(function(err) {
				if (err) {
					Log.error(err);
				} else {
					Log.audit(user.Email, 'New user created');
				}
			});
	},

	find: function finder(col, searchTerm) {
		users.find({ [col]: searchTerm }, function(err, data) {
			if (data[0]) {
				return data[0].Username;
			} else {
				console.log('no data');
				return false;
			}
		});
	},

	validatePassword: function checkPasswordRegex(password) {
			let re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
			return re.test(password);
	},
	validateEmail: function checkPasswordRegex(email) {
			let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(email);
	}
	
};
module.exports = user;