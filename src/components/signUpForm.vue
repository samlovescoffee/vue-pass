
<template>
	<div class='row'>
		<form id="access">
			<legend><h1>{{ title }}</h1></legend>

			<label class='signUpEl'><span>User name</span>
				<input id="username" v-model='inputData.username' name="username" type="text" text="User Name"/>
			</label>

			<label><span>Email</span>
				<input id="email" v-model='inputData.email' name='email' type='email' text="Email"/>
			</label>

			<label><span>Password</span>
				<input id="password" v-model='inputData.password' name='password' type='password' text="Password"/>
			</label>

			<label class='signUpEl'><span>Confirm Password</span>
				<input id="password-check" v-model='inputData.passwordCheck' name='password-check' type='password' text="Password"/>
			</label>

			<span class='toggleSignUp'>{{ signUpText }}</span>

			<button v-on:click='submit' value="Go">Submit</button>
		</form>
	</div>
</template>

<script>
import axios from 'axios';
import Router from 'vue-router';

let querystring = require('querystring');
let Cookie = require('../controllers/cookies');

export default {
  	name: 'signUpForm',
	data () {
		return {
			title: "Sign In",
			signUpText: "Don't have an account?",
			inputData: {
				username: window.debug ? "sam" : "",
				email: window.debug ? "sam@google.com" : "",
				password: window.debug ? "123qweQWE@" : ""
			}
		}
	},
  	methods: {
		submit: function handleSubmit(e) {
			e.preventDefault();

			function validateEmail(email) {
				let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				return re.test(email);
			};

			function validatePassword(password) {
				let re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
				return re.test(password);
			};

			// preserve this to access $router
			let self = this;
			if (validateEmail(this.formData.email) && validatePassword(this.formData.password)) {

				axios.post('http://localhost:3001/api/users', querystring.stringify(this.formData),
					{headers: {"Content-Type": "application/x-www-form-urlencoded"}},)
					.then(function(res) {
						//TODO: Use the JWT node packageconsole.log(res);
						let thisUser = res.data;
						sessionStorage.setItem(
							'User',
							'{"Username": "' + thisUser.Username + '"}'
						);

						

						self.$router.push('/account');
					})
					.catch(function (error) {
						switch (error.response.status) {
							case 401:
								alert('Incorrect Credentials');
								break;
							default:
								console.log(error);
								break;
						}
					});

			} else if (!validateEmail(this.formData.email)) {
				alert('Invalid email address');
			} else if (!validatePassword(this.formData.password)) {
				alert('Password must be 8 characters, numbers and include upper and lower case letters');
			}
		}
	},
	computed: {
		formData: function() {
			return {username: this.inputData.username, email: this.inputData.email, password: this.inputData.password};
		}
	}
}

</script>

<style scoped>
	form {
		padding: 50px;
		width: 450px;
		max-width: 90% !important;
		margin: auto;
		margin-top: 200px;
		box-shadow: 0px 0px 10px -2px;
		background: white;
	}

	span {
		display: block;
		margin-bottom: 5px;
		font-size: 15px;
	}

	input {
		width: 100%;
		margin-bottom: 10px;
		font-size: 20px;
		padding: 5px;
	}

	.signUpEl {
		display: none;
	}
	.signUpEl.active {
		display: block;
	}

</style>