const axios = require('axios');

const userController = {
	postUsers: function signInPost(data, self) {
        axios.post('http://localhost:3001/api/users', data,
        {headers: {"Content-Type": "application/x-www-form-urlencoded"}},)
        .then(function(res) {
            //TODO: Use the JWT node packageconsole.log(res);
            let thisUser = res.data[0];
            sessionStorage.setItem(
                'User',
                '{"Username": "' + thisUser.Username + '"}'
            );
            self.$router.push('/account');
        })
        .catch(function (error) {
            switch (error.response.status) {
                case 401:
                    self.warning = true;
                    self.warningText = "Incorrect login details";
                    self.error = true;
                    break;
                default:
                    self.warningText = "Undefined error";
                    self.error = true;
                    console.log(error);
                    break;
            }
        });
    }
};
module.exports = userController;