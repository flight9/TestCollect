import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import result from './result'

export default new Vuex.Store({
  modules: {
    result
  }
})
