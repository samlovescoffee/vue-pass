<template>
	<div class='row'>
		<ul>
			<li><router-link to="/">Home</router-link></li>
			<li><router-link to="/account">Account</router-link></li>
		</ul>
	</div>
</template>

<script>
//import signUpForm from '@/components/signUpForm'

export default {
  name: 'desktopHeader',
  components: {
    //signUpForm
  }
}
</script>

<style>
	.container {
		width: 1180px;
		max-width: 100%;
		padding: 0 15px;
		margin: auto;
		box-sizing: border-box;
		position: relative;
		}
		@media (max-width: 991px) {
		.container {
			padding: 0px 5px;
		}
		}
		.row {
		clear: both;
		margin: 0px -15px;
		}
		@media (max-width: 991px) {
		.row {
			margin: 0;
		}
		}
		.row::after {
		content: "";
		clear: both;
		display: table;
		}
		.col-1 {
		width: 8.33%;
		}
		.col-2 {
		width: 16.66%;
		}
		.col-3 {
		width: 25%;
		}
		.col-4 {
		width: 33.33%;
		}
		.col-5 {
		width: 41.66%;
		}
		.col-6 {
		width: 50%;
		}
		.col-7 {
		width: 58.33%;
		}
		.col-8 {
		width: 66.66%;
		}
		.col-9 {
		width: 75%;
		}
		.col-10 {
		width: 83.33%;
		}
		.col-11 {
		width: 91.66%;
		}
		.col-12 {
		width: 100%;
		}
		[class*="col-"] {
		float: left;
		padding: 0px 15px;
		box-sizing: border-box;
		}
		@media (max-width: 991px) {
		[class*="col-"] {
			width: 100%;
			padding: 0px;
		}
	}
</style>