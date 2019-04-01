import Vue from 'vue'

export default (function () {
  Vue.directive('focus', {
    inserted: function (el) {
      el.focus()
    }
  })
})()
