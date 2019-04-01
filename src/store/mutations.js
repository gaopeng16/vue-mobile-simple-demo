import * as types from './mutations-type'

const mutations = {
  ON_HTTP_ERROR (state, v) {
    state.httpError = v
  },
  [types.SET_VIPLEVEL] (state, v) {
    state.vipLevel = v
  },
  [types.SET_USERINFO] (state, v) {
    state.loginInfo = v
  },
  [types.SET_SIGN] (state, v) {
    state.sign = v
  },
  [types.SET_COMPANY_ID] (state, v) {
    state.companyId = v
  },
  [types.SET_COMPANY_NAME] (state, v) {
    state.companyName = v
  }
}
export default mutations
