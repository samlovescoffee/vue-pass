<template>
	<div>
		<div class='searchWrapper'>
			<form>
				<input id="searchTerm" v-model='inputData.searchTerm' name="searchTerm" type="text" text="User Name"/>
				<button v-on:click='submit' value="Go">Search</button>
			</form>
		</div>
		<div class='searchResults'>
			<p>{{ resultData.count }}</p>
			<ul>
				<li v-for="user in resultData.content">
					{{ user }}
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import Router from 'vue-router';
let querystring = require('querystring');
let Cookie = require('../utilities/cookies');

export default {
  	name: 'searchUsers',
  	data () {
		return {
			inputData: {
				searchTerm: window.debug ? "sam" : "",
			},
			resultData: {
				count: 'No Results',
				content: []
			}
		}
	},
	methods: {
		submit: function handleSubmit(e) {
			e.preventDefault();
			let self = this;
			axios.post('http://localhost:3001/api/userSearch', querystring.stringify(this.formData),
				{headers: {"Content-Type": "application/x-www-form-urlencoded"}},)
			.then(function(res) {
				//TODO: Use the JWT node package
				self.resultData.count = res.data.length === 0 ? 'No Results' : 'Returned ' + res.data.length + 'Results';
				self.resultData.content = res.data;
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