<template>
	<ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/account">Account</router-link></li>
    </ul>
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