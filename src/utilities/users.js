const axios = require('axios');
let cookies = require('./cookies');

const userController = {
	postUsers: function signInPost(data, self) {
        let JWT = cookies.read("JWT");
        if (JWT == null) JWT = false;
        ;
        axios.post('http://localhost:3001/api/users', data,
        {headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "JWT": JWT ? JWT : 'null'
        }},)
        .then(function(res) {
            userController.storeJWT(res);
            self.$router.push('/account');
        })
        .catch(function (error) {
            
            self.warning = true;
            self.warningText = error.response.data;
            self.error = true;
        });
    },
    storeJWT: function(string) {
        ;
        cookies.write('JWT', string.data, 2);
    }
};
module.exports = userController;