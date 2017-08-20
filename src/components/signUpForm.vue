
<template>
	<div class='row'>
		<form id="access">
			<legend><h1>{{ formTitle }}</h1></legend>
			<label v-if="signUp"><span>User name</span>
				<!--TODO: ajax check this on delay after keyup-->
				<input id="username" v-model='inputData.username' name="username" type="text" text="User Name"/>
			</label>
			<label><span>Email</span>
				<input id="email" v-model='inputData.email' name='email' type='email' text="Email"/>
			</label>
			<label><span>Password</span>
				<input id="password" v-model='inputData.password' name='password' type='password' text="Password"/>
			</label>
			<!--TODO: this isn't validated at present-->
			<label v-if="signUp"><span>Confirm Password</span>
				<input id="passwordCheck" v-model='inputData.passwordCheck' name='passwordCheck' type='password' text="Password"/>
			</label>
			<span v-on:click='toggleSignUp'>{{ formSwap }}</span>
			<button v-on:click='submit' value="Go">Submit</button>
		</form>
		<div v-if="warning" class="warning">
			<div v-if="error" class='tag tagRed'></div>
			<div v-else class='tag'></div>
			<p>{{ warningText }}</p>
		</div>
	</div>
</template>

<script>
import Router from 'vue-router';
const querystring = require('querystring');
const Cookie = require('../utilities/cookies');
import hitApi from '../utilities/api';
const validate = require('../utilities/validate');

export default {
  	name: 'signUpForm',
	data () {
		return {
			signUp: false,
			inputData: {
				username: window.debug ? "sam" : "",
				email: window.debug ? "sam@google.com" : "",
				password: window.debug ? "123qweQWE@" : "",
				passwordCheck: window.debug ? "123qweQWE@" : ""
			},
			warningText: "",
			warning: false,
			error: false
		}
	},
  	methods: {
		submit: function handleSubmit(e) {
			e.preventDefault();
			// preserve this to access $router
			let self = this;
			if (validate.Email(this.formData.email) && validate.Password(this.formData.password)) {
				hitApi.post('http://localhost:3001/api/users', querystring.stringify(this.formData))
				.then(function(val){
					//Cookie.storeJWT(val);
                	self.$router.push('/account');
				})
				.catch(function(error){
					console.log(error);
					self.warning = true;
					self.warningText = error.response.data;
					self.error = true;
				});

			} else if (!validate.Email(this.formData.email)) {
				this.warningText = 'Invalid email address';
				this.warning = true;
				this.error = false;
			} else if (!validate.Password(this.formData.password)) {
				this.warningText = 'Passwords must be 8 characters long, including numbers, upper case letters and lower case letters';
				this.warning = true;
				this.error = false;
			}
		},
		toggleSignUp: function() {
			this.signUp = !this.signUp;
		}
	},
	computed: {
		formData: function() {
			return {username:this.inputData.username, email: this.inputData.email, password: this.inputData.password, signUp: this.signUp};
		},
		formSwap: function() {
			return this.signUp ? "Already have an account?" : "Don't have an account?";
		},
		formTitle: function() {
			return this.signUp ? "Sign Up" : "Sign In";
		}
	}
}
</script>

<style scoped>
	@keyframes fadeIn {
		from {opacity: 0; margin-top: 20px;}
		to {opacity: 1;  margin-top: 10px;}
	}
	form {
		padding: 50px;
		width: 450px;
		max-width: 90% !important;
		margin: auto;
		margin-top: 200px;
		box-shadow: 0px 0px 10px -2px #929292;
		border: solid 1px #b7b7b7;
		background: white;
	}
	span {
		display: block;
		margin-bottom: 15px;
		font-size: 15px;
	}
	label span {
		margin-bottom: 5px;
	}
	input {
		width: 100%;
		margin-bottom: 15px;
		font-size: 20px;
		padding: 5px;
	}
	.warning {
		background: white;
		padding: 20px 50px;
		width: 450px;
		box-shadow: 0px 0px 10px -2px #929292;
		border: solid 1px #b7b7b7;
		margin: auto;
		margin-top: 10px;
		animation-name: fadeIn;
    	animation-duration: 0.4s;
		overflow: hidden;
		position: relative;
	}
	.warning p {
		margin-bottom: 0;
	}
	.warning .tag {
		position: absolute;
		top: 0;
		right: 0;
		width: 3px;
		height: 100%;
		background: orange;
	}
	.warning .tagRed {
		background: red;
	}
</style>