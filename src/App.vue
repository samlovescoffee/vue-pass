<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
* {
	margin-top: 0;
}
body {
	background: #f1f1f1;
	color: #191919;
}
button {
	padding: 10px 30px;
	background: #0892D0;
	border: solid 3px #0892D0;
	color: white;
	font-size: 15px;
	cursor: pointer;
	transition: all 0.4s;
	box-shadow: 0px 0px 10px -2px #929292;
}
button:hover {
	background: rgba(0, 0, 0, 0);
	color: #0892D0;
}
.flaggedInput {
	border-color: red;
}
</style>
