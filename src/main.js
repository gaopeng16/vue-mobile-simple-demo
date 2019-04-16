// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import store from './store'
import router from './router'
import '../static/js/flexible'
import FastClick from 'fastclick'
import Mint from 'mint-ui'
import './utils/filter'
import './utils/directive'
import global_ from './components/Global'
import 'mint-ui/lib/style.css'
import VueValidator from 'vue-validator'
import './assets/iconfont/iconfont.css'
import Loading from './components/loading/index'
import mixin from './utils/mixin'

Vue.use(Vuex)
Vue.use(Mint)
Vue.use(VueValidator)
Vue.use(Loading)
Vue.mixin(mixin)

Vue.config.productionTip = false

FastClick.attach(document.body)

window.addEventListener('popstate', function (e) {
  router.toGoBack()
}, false)

Vue.prototype.GLOBAL = global_

/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
