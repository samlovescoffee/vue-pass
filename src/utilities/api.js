const cookies = require('./cookies');
const axios = require('axios');

const hitApi = {
	post: function(path, data) {
        return new Promise ((resolve, reject) => {
            let JWT = "Bearer " + cookies.read('JWT');
            debugger;
            axios.post(path, data,
            {headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": JWT ? JWT : null
            }},)
            .then(function(res) {
                if ('JWT' in res.data) {
                    cookies.write('JWT', res.data['JWT'], 2);
                }
                resolve(res);
            })
            .catch(function (error) {
                reject(error);
            });
        }); 
    }
};
export default hitApi;