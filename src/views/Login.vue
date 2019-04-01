<template>
  <div class="login-body">
    <Header :title="title"></Header>
    <div class="logo"></div>
    <mt-field label="账号" placeholder="请输入手机号" v-model.trim="phoneNum"></mt-field>
    <mt-field label="密码" placeholder="请输入密码" type="password" v-model.trim="password"></mt-field>
    <mt-button type="primary" @click="toLogin">登录</mt-button>
  </div>
</template>

<script>
  import Header from '@/components/Header'
  import * as API from 'api/api'
  import {mapMutations} from 'vuex'
  import {SET_USERINFO, SET_SIGN} from '../store/mutations-type'

  export default {
    components: {Header},
    data () {
      return {
        title: '登录',
        phoneNum: null,
        password: null
      }
    },
    methods: {
      ...mapMutations({
        SET_USERINFO,
        SET_SIGN
      }),
      toLogin () {
        let _this = this
        let params = {
          'iphone': '18253758563',
          'password': '111111'
        }
        API.login(params).then(res => {
          console.log(res)
          if (res.code == 0) {
            const loginInfo = {
              userId: res.data.bussUser.id,
              mobile: res.data.bussUser.mobile,
              headPic: res.data.bussUser.headPic,
              vipLevel: res.data.bussUser.vipLevel,
              expireDate: res.data.bussUser.expireDate
            }
            this.SET_USERINFO(loginInfo)
            this.SET_SIGN(res.data.sign)
            this.$router.push('/')
          }
        })
      }
    },
    created () {
      this.$store.state.showHeader = true
      this.$store.state.showBottomNav = false
    }
  }
</script>

<style scoped lang="less">
  @import "./../styles/index.less";
  @import "./../styles/variable.less";

  .login-body {
  }
</style>
