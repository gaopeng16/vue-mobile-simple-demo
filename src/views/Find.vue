<template>
  <div>
    <h1>运用gpAnimate</h1>
    <div class="box" ref="box"></div>
  </div>
</template>

<script>
  import {gpAnimate, getStyle, setStyle} from './../utils/gpAnimate'

  export default {
    name: 'Find',
    mounted () {
      this.$store.state.showHeader = false
      this.$store.state.showBottomNav = true
      this.move()
    },
    methods: {
      move () {
        gpAnimate(this.$refs.box, {top: 400, left: 300, opacity: 0.2}, 1000, ['Bounce', 'easeIn'], function () {
          alert('动画执行完毕')
        })
      }
    }

  }
</script>

<style scoped>
  .box {
    position: absolute;
    top: 10px;
    left: 20px;
    width: 50px;
    height: 50px;
    background: #abcdef;
  }

  .box2 {
    position: absolute;
    top: 10px;
    left: 20px;
    width: 50px;
    height: 50px;
    background: #abcdef;
    border: solid 1px red;
  }
</style>
