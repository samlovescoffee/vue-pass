const cookies = require('./cookies');
const axios = require('axios');

const hitApi = {
	post: function(path, data) {
        return new Promise ((resolve, reject) => {
            axios.post(path, data,
            {headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }},)
            .then(function(res) {
                console.log(res);
                resolve(res);
            })
            .catch(function (error) {
                reject(error);
            });
        }); 
    }
};
export default hitApi;