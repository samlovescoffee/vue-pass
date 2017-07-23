<template>
	<div>
		<desktopHeader></desktopHeader>
		<signUpForm></signUpForm>
	</div>

</template>

<script>
import signUpForm from '@/components/signUpForm'
import desktopHeader from '@/components/header'

export default {
  name: 'signUp',
  data () {
    return {
      title: 'Sign Up'
    }
  }, 
  components: {
    desktopHeader,
    signUpForm
  }
}
</script>