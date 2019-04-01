<template>
  <div id="app">
    <div class="router-box" :style="{marginTop:$store.state.showHeader?'40px':'0'}">
      <transition :name="transitionName" mode="out-in">
        <router-view class="Router"></router-view>
      </transition>
    </div>

    <BottomNav v-if="$store.state.showBottomNav" :idx="bottomNavIndex"></BottomNav>
    <div v-if="$store.state.showBottomNav" class="empty"></div>

  </div>
</template>

<script>
  import BottomNav from '@/components/BottomNav'
  import Header from '@/components/Header'

  export default {
    components: {BottomNav, Header},
    name: 'App',
    data () {
      return {
        transitionName: 'slideleft',
        bottomNavIndex: 0,
      }
    },
    methods: {
      setBottomNavIndex () {
        switch (this.$route.name) {
          case 'Index':
            this.bottomNavIndex = 0
            break
          case 'Category':
            this.bottomNavIndex = 1
            break
          case 'Search':
            this.bottomNavIndex = 2
            break
          case 'Find':
            this.bottomNavIndex = 3
            break
          case 'Mine':
            this.bottomNavIndex = 4
            break
        }
      }
    },
    mounted () {
      this.setBottomNavIndex()
    },
    watch: {
      $route () { // 监听路由变化重新赋值
        this.setBottomNavIndex()
        if (this.$router.isleft) {
          this.transitionName = 'slideleft'
        }
        if (this.$router.isright) {
          this.transitionName = 'slideright'
        }
      }
    }
  }
</script>

<style lang="less">
  @import "./styles/index.less";
  @import "./styles/variable.less";

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    font-size: 14px;
  }

  .router-box {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .Router {
    /*position: absolute;
    top: 0;
    left: 0;
    right: 0;*/
    width: 100%;
    height: 100%;
    transition: all .1s ease;
    -webkit-transition: all .1s ease;
    -moz-transition: all .1s ease;
  }

  .slideleft-enter,
  .slideright-leave-active {
    opacity: 0;
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
  }

  .slideleft-leave-active,
  .slideright-enter {
    opacity: 0;
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100%, 0);
  }

  .empty {
    .h(90);
  }

  /*common css*/
  .w100 {
    width: 100%;
  }

  .oh {
    overflow: hidden;
  }

  .clear {
    zoom: 1
  }

  .left {
    float: left;
  }

  .right {
    float: right;
  }

  .f-red {
    color: red;
  }

  .f-click {
    color: #2196f4!important;
  }

  .clear:after, .clear:before {
    display: block;
    width: 0;
    height: 0;
    content: '';
    overflow: hidden;
    clear: both;
  }

  .t-center {
    text-align: center;
  }

  .t-left {
    text-align: left;
  }

  .t-right {
    text-align: right;
  }

  .block {
    display: block;
  }

  .auto {
    margin: 0 auto;
  }

  .flex-container-row {
    display: -webkit-flex; /* Safari */
    display: flex;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
  }


</style>
