
<template>
	<div class='row'>
		<form id="access">
			<legend><h1>{{ title }}</h1></legend>
			<label v-if="signUp"><span>User name</span>
				<input id="username" v-model='inputData.username' name="username" type="text" text="User Name"/>
			</label>
			<label><span>Email</span>
				<input id="email" v-model='inputData.email' name='email' type='email' text="Email"/>
			</label>
			<label><span>Password</span>
				<input id="password" v-model='inputData.password' name='password' type='password' text="Password"/>
			</label>
			<label v-if="signUp"><span>Confirm Password</span>
				<input id="passwordCheck" v-model='inputData.passwordCheck' name='passwordCheck' type='password' text="Password"/>
			</label>
			<span v-on:click='toggleSignUp'>{{ signUpText }}</span>
			<button v-on:click='submit' value="Go">Submit</button>
		</form>
	</div>
</template>

<script>
import Router from 'vue-router';
let querystring = require('querystring');
let Cookie = require('../utilities/cookies');
let userController = require('../utilities/users');
let validate = require('../utilities/validate');

export default {
  	name: 'signUpForm',
	data () {
		return {
			signUp: false,
			// text doesn't seem to pay attention
			signUpText: this.signUp ? "Don't have an account?" : "Already have an account?",
			title: this.signUp ? "Sign In" : "Sign Up",
			inputData: {
				username: window.debug ? "sam" : "",
				email: window.debug ? "sam@google.com" : "",
				password: window.debug ? "123qweQWE@" : "",
				passwordCheck: window.debug ? "123qweQWE@" : ""
			}
		}
	},
  	methods: {
		submit: function handleSubmit(e) {
			e.preventDefault();
			// preserve this to access $router
			let self = this;
			if (validate.Email(this.formData.email) && validate.Password(this.formData.password)) {
				userController.postUsers(querystring.stringify(this.formData), self);
			} else if (!validate.Email(this.formData.email)) {
				alert('Invalid email address');
			} else if (!validate.Password(this.formData.password)) {
				alert('Password must be 8 characters, numbers and include upper and lower case letters');
			}
		},
		toggleSignUp: function() {
			this.signUp = !this.signUp;
		}
	},
	computed: {
		formData: function() {
			return {username:this.inputData.username, email: this.inputData.email, password: this.inputData.password, signUp: this.signUp};
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