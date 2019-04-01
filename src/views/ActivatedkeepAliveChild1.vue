<template>
  <div>
    <br>
    <h3>ActivatedkeepAliveChild1</h3>
    <p>ActivatedkeepAliveChild1 子路由一</p>
    <input type="radio">
    <router-view></router-view>
  </div>
</template>

<script>
  import * as API from 'api/api'

  /**
   * 实现了，从其他页面进入child1时，调取接口，而从child2进入child1页面时，不调取接口
   */
  export default {
    name: 'ActivatedkeepAliveChild1',
    data () {
      return {
        isFirstEnter: false
      }
    },
    beforeRouteEnter (to, from, next) {
      console.log(to)
      if (from.name == 'ActivatedkeepAliveChild2') { // 这个name是下一级页面的路由name
        to.meta.isBack = true // 设置为true说明你是返回到这个页面，而不是通过跳转从其他页面进入到这个页面
      }
      next()
    },
    methods: {
      // 获取热点
      getNewsList () {
        API.hotListUrl().then(res => {
          if (res.code === 0) {
            console.log('子模块请求接口了-->', res)
            this.newsList = res.data.records
          }
        })
      },
    },
    created () {
      // console.log(this.$route)

      this.isFirstEnter = true
    },
    activated () {
      if (!this.$route.meta.isBack && this.isFirstEnter) {
        this.getNewsList()
      }
      this.$route.meta.isBack = false
      this.isFirstEnter = true
    },
  }
</script>

<style scoped>

</style>
