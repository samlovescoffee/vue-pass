const axios = require('axios');
let cookies = require('./cookies');

const userController = {
	postUsers: function signInPost(data, self) {
        axios.post('http://localhost:3001/api/users', data,
        {headers: {"Content-Type": "application/x-www-form-urlencoded"}},)
        .then(function(res) {
            userController.storeJWT(res);
            //self.$router.push('/account');
        })
        .catch(function (error) {
            debugger
            self.warning = true;
            self.warningText = error.response.data;
            self.error = true;
        });
    },
    storeJWT: function(string) {
        debugger;
        cookies.write('JWT', string.data, 2);
    }
};
module.exports = userController;