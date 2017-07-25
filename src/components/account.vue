<template>
	<div class='row'>
		<desktopHeader></desktopHeader>
		<h1>This is the account</h1>
	</div>

</template>

<script>
import desktopHeader from '@/components/header'

export default {
  name: 'account', 
  components: {
    desktopHeader
  }
}
</script>