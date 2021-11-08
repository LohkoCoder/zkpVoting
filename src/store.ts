import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    anonymousVotingAdd: ""
  },
  mutations: {
    anonymousVoting (state:any, address:any) {
      state.anonymousVotingAdd = address
    }
  },
  actions: {
    anonymousVoting(context:any, address:any) {
      context.commit('anonymousVoting', address)
    }
  }
})
