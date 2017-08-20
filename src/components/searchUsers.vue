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
import Router from 'vue-router';
import hitApi from '../utilities/api';
const querystring = require('querystring');

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
			// TODO: lets use a generic function for all posts, then we can handle redirects effectively.
			hitApi.post('http://localhost:3001/api/userSearch', querystring.stringify(this.formData))
			.then(function(res) {
				self.resultData.count = res.data.length === 0 ? 'No Results' : 'Returned ' + res.data.length + 'Result(s)';
				self.resultData.content = res.data;
			})
			.catch(function (error) {
				console.log(error);
				self.$router.push('/');
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