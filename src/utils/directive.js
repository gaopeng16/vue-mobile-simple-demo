import Vue from 'vue'

export default (function () {
  Vue.directive('focus', {
    inserted: function (el) {
      el.focus()
    }
  })
  Vue.directive('style', {
    bind: function () {
      console.log('0->:bind')
    },
    inserted: function (el, binding, vnode) {
      console.log('1->inserted')
      var s = JSON.stringify
      el.innerHTML =
        'el:'+el+'---元素<br>'+
        'name: ' + s(binding.name) + '---指令名，不包括 v- 前缀。<br>' +
        'value: ' + s(binding.value) + '---指令的绑定值<br>' +
        'expression: ' + s(binding.expression) + '---指令的绑定的变量名<br>' +
        'arg: ' + s(binding.arg) + '---给指令传的参数<br>' +
        'modifiers: ' + s(binding.modifiers) + '---一个包含修饰符的对象<br>' +
        'vnode keys: ' + Object.keys(vnode).join(', ')+'----编译生成的虚拟节点'
    },
    update: function () {
      console.log('2->update')
    },
    componentUpdated: function () {
      console.log('3->componentUpdate')
    },
    unbind: function () {
      console.log('4->unbind')
    }
  })
})()
