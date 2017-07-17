import Vue from 'vue'
import Router from 'vue-router'
import signUp from '@/components/signUp'
import test from '@/components/test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'signUp',
      component: signUp
    },
    {
      path: '/test',
      name: 'test',
      component: test
    }
  ]
})