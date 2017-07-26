<template>
	<div>
		<div class='searchWrapper'>
			<form>
				<input id="searchTerm" v-model='inputData.searchTerm' name="searchTerm" type="text" text="User Name"/>
				<button v-on:click='submit' value="Go">Search</button>
			</form>
		</div>
	</div>
</template>

<script>

import axios from 'axios';
import Router from 'vue-router';

let querystring = require('querystring');
let Cookie = require('../controllers/cookies');

export default {
  	name: 'searchUsers',
  	data () {
		return {
			inputData: {
				searchTerm: window.debug ? "sam@google.com" : "",
			}
		}
	},
	methods: {
		submit: function handleSubmit(e) {
			e.preventDefault();

			axios.post('http://localhost:3001/api/userSearch', querystring.stringify(this.formData),
				{headers: {"Content-Type": "application/x-www-form-urlencoded"}},)
				.then(function(res) {
					//TODO: Use the JWT node package
					console.log(res);
				})
				.catch(function (error) {
					console.log(error);
				});
		}
	},
	computed: {
		formData: function() {
			return {searchTerm: this.inputData.searchTerm};
		}
	}
}
</script>