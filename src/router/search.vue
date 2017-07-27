<template>
	<div class='row'>
		<h1>This is the search page</h1>
    	<searchUsers></searchUsers>
	</div>
</template>

<script>
import searchUsers from '@/components/searchUsers'

export default {
	name: 'search', 
	components: {
		searchUsers
	}
}
</script>