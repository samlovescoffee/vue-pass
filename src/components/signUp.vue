<template>
	<div>
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
    signUpForm
  }
}
</script>