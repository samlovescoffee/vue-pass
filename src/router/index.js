import Vue from 'vue'
import Router from 'vue-router'
import signUp from '@/components/signUp'
import account from '@/components/account'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'signUp',
      component: signUp
    },
    {
      path: '/account',
      name: 'account',
      component: account
    }
  ]
})