import Vue from 'vue'
import Router from 'vue-router'
import LocalCrypto from './views/LocalCrypto.vue'
import LocalCrypto_commitment from './views/localCrypto_commitment.vue'

import anonymousvoting_owner from /* webpackChunkName: "about" */ './views/anonymousVoting_owner.vue'
import anonymousvoting_voter from /* webpackChunkName: "about" */ './views/anonymousVoting_voter.vue'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Router)
Vue.use(BootstrapVue)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'localcrypto',
      component: LocalCrypto
    },
    {
      path: '/commitment',
      name: 'LocalCrypto_commitment',
      component: LocalCrypto_commitment
    },
    {
      path: '/owner',
      name: 'anonymousvoting_owner',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: anonymousvoting_owner
    },
    {
      path: '/voter',
      name: 'anonymousvoting_voter',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: anonymousvoting_voter
    }
  ]
})
