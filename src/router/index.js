import Vue from 'vue'
import Router from 'vue-router'
import Page404 from '@/views/Page404'
import Index from '@/views/Index'
import Category from '@/views/Category'
import Search from '@/views/search/Search'
import Find from '@/views/Find'
import Mine from '@/views/Mine'
import CompanyInfo from '@/views/companyInfo/CompanyInfo'
import Gsxx from '@/views/companyInfo/comBasicInfo/Gsxx'
import CompanyDepthInfo from '@/views/companyDepthInfo/CompanyDepthInfo'

Vue.use(Router)

// 需要左方向动画的路由用this.$router.toGo('****')
Router.prototype.toGo = function (path) {
  this.isleft = true
  this.isright = false
  this.push(path)
}
// 需要右方向动画的路由用this.$router.goRight('****')
Router.prototype.goRight = function (path) {
  this.isleft = false
  this.isright = true
  this.push(path)
}
// 需要返回按钮动画的路由用this.$router.goBack()，返回上一个路由
Router.prototype.goBack = function () {
  this.isleft = false
  this.isright = true
  this.go(-1)
}
// 点击浏览器返回按钮执行，此时不需要路由回退
Router.prototype.toGoBack = function () {
  this.isleft = false
  this.isright = true
}

const Left = () => import('@/views/Left')
const Right = () => import('@/views/Right')
var header = {
  template: '<h1 class="header">head头部区域</h1>'
}

var leftNav = {
  template: '<h1 class="left">left侧边栏</h1>'
}

var mainContent = {
  template: '<h1 class="main">main主体内容</h1>'
}
const router = new Router({
  mode: 'history',
  scrollBehavior (to, form, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      const position = {}
      if (to.hash) {
        position.selector = to.hash
        return position
      }
    }
  },
  routes: [
    {path: '/', name: 'Index', component: Index},
    {path: '/login', name: 'Login', component: () => import('@/views/Login')},
    {path: '/category', name: 'Category', component: Category},
    {path: '/search', name: 'Search', component: Search},
    {path: '/find', name: 'Find', component: Find},
    {path: '/mine', name: 'Mine', component: Mine},
    {path: '/companyInfo', name: 'CompanyInfo', component: CompanyInfo},
    {path: '/gsxx', name: 'Gsxx', component: Gsxx},
    {path: '/companyDepthInfo', name: 'CompanyDepthInfo', component: CompanyDepthInfo},
    {
      path: '/keepAlive2',
      name: 'ActivatedkeepAlive2',
      component: () => import(/* webpackChunkName:'keepalive' */ '@/views/ActivatedKeepAlive2')
    },
    {
      path: '/keepAliveNext',
      name: 'ActivatedkeepAliveNext',
      component: () => import(/* webpackChunkName:'keepalive' */ '@/views/ActivatedKeepAliveNext')
    },
    {
      path: '/keepAlive',
      name: 'ActivatedkeepAlive',
      meta: {
        isBack: false,
        title: '我是标题'
      },
      component: () => import('@/views/ActivatedKeepAlive'), //es6 提案的import
      children: [
        {
          path: 'child1',
          name: 'ActivatedkeepAliveChild1',
          // component: resolve => require(['@/views/ActivatedkeepAliveChild1'], resolve) //vue异步组件
          components: {
            default: resolve => require(['@/views/ActivatedkeepAliveChild1'], resolve), //es6 提案的import
            left: Left,
            right: Right
          },
        },
        {
          path: 'child2',
          name: 'ActivatedkeepAliveChild2',
          // component: r => require.ensure([], () => r(require(['@/views/ActivatedkeepAliveChild2'])), 'keepalive') // webpack->require.ensure
          component: () => import(/* webpackChunkName:'keepalive' */ '@/views/ActivatedkeepAliveChild2')
        },
        {
          path: 'child3',
          name: 'ActivatedkeepAliveChild3',
          component: () => import(/* webpackChunkName:'keepalive' */ '@/views/ActivatedkeepAliveChild3')
        }
      ]
    },
    {path: '*', component: Page404}
    // {path: '*', redirect: '/'}
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/login')) {
    window.localStorage.removeItem('vuex')
    next()
  } else {
    let user = window.localStorage.getItem('vuex')
    if (!user) {
      next({path: './login'})
    } else {
      next()
    }
  }
})

export default router
