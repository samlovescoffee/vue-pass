import Vue from 'vue'
import Router from 'vue-router'
import signUp from './signUp'
import search from './search'
import account from './account'

Vue.use(Router)

const DEBUG = true;

export default new Router({
  routes: [
    {
      path: '/',
      name: 'signUp',
      component: signUp
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/account',
      name: 'account',
      component: account
    }
  ]
})