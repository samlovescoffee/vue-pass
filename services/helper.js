let passwordHash = require('password-hash');

const helper = {
    validatePassword: function checkPasswordRegex(password) {
			let re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
			return re.test(password);
	},
	validateEmail: function checkPasswordRegex(email) {
			let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(email);
	},
	createJWT: function(user) {
		let days = 1;
		let tomorrow = new Date(Date.now() + days*24*60*60*1000);
		let payload = {
			name: user.Username,
			access: user.Access,
			expires: tomorrow
		};
		let encoded = new Buffer(JSON.stringify(payload)).toString('base64');
		let hashed = passwordHash.generate(JSON.stringify(payload));
		return JSON.stringify(encoded) + "." + hashed;
	},
	validateJWT: function(JWT) {
		let arr = JWT.split('.');
		let decoded = new Buffer(arr[0], 'base64').toString();
		return passwordHash.verify(decoded, arr[1]);
	}
}

module.exports = helper;