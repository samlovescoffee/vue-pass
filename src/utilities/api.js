let cookies = require('./cookies');
const axios = require('axios');

const hitApi = {
	post: function(path, data) {
        return new Promise ((resolve, reject) => {
            let JWT = cookies.read("JWT");
            if (JWT == null) JWT = false;
            debugger;
            axios.post(path, data,
            {headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "JWT": JWT ? JWT : null
            }},)
            .then(function(res) {
                resolve(res);
            })
            .catch(function (error) {
                reject(errror);
            });
        }); 
    }
};
module.exports = hitApi;