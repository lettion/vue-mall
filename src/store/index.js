import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    recommends: []
  },
  mutations: {
    initRecommends (state, list) {
      state.recommends = list
    }
  }
})
