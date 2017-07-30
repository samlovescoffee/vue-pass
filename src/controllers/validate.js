const validate = {
	Email: function validateEmail(email) {
            let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
    Password: function validatePassword(password) {
            let re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
            return re.test(password);
        }
};
module.exports = validate;