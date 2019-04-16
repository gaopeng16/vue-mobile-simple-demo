<template>
  <div style="text-align: left;line-height: 40px;">
    <h1>自定义指令详解</h1>
    <div v-style:arg.foo.bar="hello"></div>
    <br>
    <div>{{mixin}}<br>{{intro}}</div>
  </div>

</template>

<script>
  var mixin = {
    data () {
      return {
        mixin: '混入对象的mixin',
        intro: '我是混入对象中的数据'
      }
    },
    methods: {
      foo: function () {
        console.log('foo')
      },
      conflicting: function () {
        console.log('from mixin')
      }
    },
    created: function () {
      console.log('混入对象的钩子被调用')
    }
  }
  export default {
    name: 'Category',
    mixins: [mixin],
    data () {
      return {
        hello: '你好啊!',
        mixin: '原mixin',
      }
    },
    methods: {
      bar: function () {
        console.log('bar')
      },
      conflicting: function () {
        console.log('from self')
      }
    },
    created: function () {
      console.log('组件钩子被调用');
      this.foo();
      this.bar();
      this.conflicting();
    }
  }
</script>

<style scoped>

</style>
