import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import createPersistedState from 'vuex-persistedstate'
import Cookies from 'js-cookie'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  plugins: [createPersistedState({
    reducer (val) {
      return {
        // 只储存state中的sign，loginInfo
        loginInfo: val.loginInfo,
        sign: val.sign,
        companyName: val.companyName,
        companyId: val.companyId
      }
    }
  })]
})
