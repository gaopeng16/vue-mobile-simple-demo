<template>
  <div>
    <div class="user-header w100">
      <div class="clear"></div>
      <div class="avatar oh" @click="goLogin">
        <img v-if="Object.keys(loginInfo).length" :src="imgFile+loginInfo.headPic">
        <img v-else src="../../static/images/ic_head_default.png">
      </div>
      <div class="phone-num">{{Object.keys(loginInfo).length ? loginInfo.mobile :'未登录'}}</div>
      <div v-if="Object.keys(loginInfo).length" class="time-limits">到期时间：{{loginInfo.expireDate | delhms}}</div>
    </div>
    <ul class="home-search-group flex-container-row">
      <li><img class="desc-img" src="../../static/images/my_message.png"><br>
        <span>签到</span>
      </li>
      <li><img class="desc-img" src="../../static/images/ic_jinbi.png"><br>
        <span>{{Object.keys(sign).length ? sign.score :0}}</span></li>
      <li><img class="desc-img" src="../../static/images/my_gz.png"><br>
        <span>我的关注</span></li>
      <li><img class="desc-img" src="../../static/images/my_dd.png"><br>
        <span>我的订单</span></li>
    </ul>
    <div class="t-left img-middle user-block">
      <mt-cell title="邀请赢奖" is-link>
        <img slot="icon" src="../../static/images/my_invite.png" width="20" height="20">
      </mt-cell>
      <mt-cell title="会员特权" is-link>
        <img slot="icon" src="../../static/images/my_viptq.png" width="20" height="20">
      </mt-cell>
      <mt-cell title="分享给好友" is-link>
        <img slot="icon" src="../../static/images/set_fx.png" width="20" height="20">
      </mt-cell>
    </div>
    <div class="t-left img-middle user-block">
      <mt-cell title="我的公司" is-link>
        <img slot="icon" src="../../static/images/mygong.png" width="20" height="20">
      </mt-cell>
      <mt-cell title="我的特权" is-link>
        <img slot="icon" src="../../static/images/my_tq.png" width="20" height="20">
      </mt-cell>
      <mt-cell title="我的发票" is-link>
        <img slot="icon" src="../../static/images/ic_myfp.png" width="20" height="20">
      </mt-cell>
    </div>
    <div class="t-left img-middle user-block">
      <mt-cell title="我的余额" is-link>
        <img slot="icon" src="../../static/images/ic_gv1_5.png" width="20" height="20">
      </mt-cell>
      <mt-cell title="实名认证" is-link>
        <span>未认证</span>
        <img slot="icon" src="../../static/images/ic_mycard.png" width="20" height="20">
      </mt-cell>
    </div>
    <div class="t-left img-middle user-block">
      <mt-cell title="设置中心" is-link>
        <img slot="icon" src="../../static/images/my_set.png" width="20" height="20">
      </mt-cell>
      <div @click="logout">
        <mt-cell title="退出登录" is-link>
          <img slot="icon" src="../../static/images/my_set.png" width="20" height="20">
        </mt-cell>
      </div>

    </div>

  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    data () {
      return {
        imgFile: this.GLOBAL.imgFile,
      }
    },
    computed: {
      ...mapState(['loginInfo', 'sign']),
    },
    methods: {
      // 登录
      goLogin () {
        if (!Object.keys(this.loginInfo).length) {
          this.$router.push('/login')
        }
      },
      // 退出登录
      logout () {
        this.$store.state.loginInfo = {}
        this.$store.state.sign = {}
        window.localStorage.removeItem('vuex')
      }
    },
    created () {
      this.$store.state.showHeader = false
      this.$store.state.showBottomNav = true
    }
  }
</script>

<style scoped lang="less">
  @import "./../styles/index.less";
  @import "./../styles/variable.less";

  .user-header {
    .h(400);
    background: url("../../static/images/my_bg.png") no-repeat;
    background-size: 100% 100%;
    justify-content: center;

    .avatar {
      .w(180);
      .h(180);
      .b-radius(90);
      margin: 0 auto;
      .mt(60);
      .mb(20);

      img {
        width: 100%;
      }
    }

    .phone-num, .time-limits {
      color: #ffffff;
      .lh(40)
    }
  }

  .home-search-group {
    .w(700);
    .h(140);
    .b-radius(5);
    .margin(-30, 25, 0, 25);
    background: @body-bg-white;

    li {
      flex: 1;
      text-align: center;

      img {
        .w(50);
        .h(50);
        .mt(25)
      }

      span {
        .lh(40)
      }
    }
  }

  .user-block {
    .w(720);
    .mt(20);
    .ml(15);
    box-shadow: 0px 2px 3px 3px #F3F3F3;
  }

  .img-middle img {
    vertical-align: middle;
  }
</style>
