<template>
	<div class='row'>
        <h1 style='text-transform: capitalize'>Hi {{ Username }}</h1>
        <h3>This is the account page</h3>
	</div>
</template>

<script>
//import account from '@/components/account'

export default {
	name: 'account',
    data () {
		return {
			Username: JSON.parse(sessionStorage.getItem('User')).Username
		}
	}
}
</script>