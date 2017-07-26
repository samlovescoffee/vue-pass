<template>
	<div class='row'>
		<searchUsers></searchUsers>
		<h1>This is the account</h1>
	</div>

</template>

<script>
import searchUsers from '@/components/searchUsers'

export default {
  name: 'account', 
  components: {
    searchUsers
  }
}
</script>