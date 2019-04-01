<template>
  <div>
    <Header :title="title"></Header>
    <div class="home-banner">
      <img class="name-img" :src="imgUrl+'home_ic_top_01.png'">
      <router-link to="/search"><img class="search-img" :src="imgUrl+'home_ic_top_02.png'"></router-link>
      <img class="desc-img" :src="imgUrl+'home_ic_top_03.png'">
    </div>
    <ul class="home-search-group flex-container-row">
      <li><img class="desc-img" :src="imgUrl+'home_ic_01.png'"><br>
        <span>查公司</span>
      </li>
      <li><img class="desc-img" :src="imgUrl+'home_ic_02.png'"><br>
        <span>查老板</span></li>
      <li><img class="desc-img" :src="imgUrl+'home_ic_03.png'"><br>
        <span>查关系</span></li>
    </ul>
    <div class="mswipe oh">
      <mt-swipe :auto="4000">
        <mt-swipe-item><img class="desc-img" :src="imgUrl+'home_banner01.png'"></mt-swipe-item>
        <mt-swipe-item><img class="desc-img" :src="imgUrl+'home_banner02.png'"></mt-swipe-item>
        <mt-swipe-item><img class="desc-img" :src="imgUrl+'home_banner03.png'"></mt-swipe-item>
        <mt-swipe-item><img class="desc-img" :src="imgUrl+'home_banner04.png'"></mt-swipe-item>
        <mt-swipe-item><img class="desc-img" :src="imgUrl+'home_banner05.png'"></mt-swipe-item>
        <mt-swipe-item><img class="desc-img" :src="imgUrl+'home_banner06.png'"></mt-swipe-item>
        <mt-swipe-item><img class="desc-img" :src="imgUrl+'home_banner07.png'"></mt-swipe-item>
        <mt-swipe-item><img class="desc-img" :src="imgUrl+'home_banner08.png'"></mt-swipe-item>
        <mt-swipe-item><img class="desc-img" :src="imgUrl+'home_banner09.png'"></mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="hot-news oh">
      <div class="left">
        <img class="left" :src="imgUrl+'ic_redian_ioc.png'">
        <span class="left f-red">热点：</span>
      </div>
      <div class="right">
        <Swiper class="hot-news-list" v-if="newsList.length > 0" :showIndicator='false'>
          <Slide class="t-left f-click" v-for="(v,i) in newsList" :key="i">{{v.title}}</Slide>
        </Swiper>
      </div>
    </div>
    <div class="guess-like">
      <div class="index-column-title flex-container-row">
        <span></span>
        <a>猜你喜欢</a>
        <span></span>
      </div>
      <ul class="guess-list">
        <li><img class="w100" :src="imgUrl+'home_ic5_01.png'"></li>
        <li><img class="w100" :src="imgUrl+'home_ic5_02.png'"></li>
        <li><img class="w100" :src="imgUrl+'home_ic5_03.png'"></li>
        <li><img class="w100" :src="imgUrl+'home_ic5_04.png'"></li>
        <li><img class="w100" :src="imgUrl+'home_ic5_05.png'"></li>
      </ul>
    </div>
    <div class="hot-search">
      <div class="index-column-title flex-container-row">
        <span></span>
        <a>热门搜索</a>
        <span></span>
      </div>
      <ul class="hot-com">
        <li class="oh" v-for="(v,k) in hotSearchList">
          <div class="logo left">
            <LogoOrFont :logoUrl="v.logoUrl" :shortName="v.companyName"></LogoOrFont>
          </div>
          <div class="com-info left t-left">
            <div class="companyName">{{v.companyName}}</div>
            <div class="legalPerson">法定代表人：{{v.legalPerson}}</div>
            <div class="registeredCapital">注册资本：{{v.registeredCapital}}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import * as API from 'api/api'
  import {Swiper, Slide} from 'vue-swiper-component'
  import LogoOrFont from '@/components/LogoOrFont'
  import BottomNav from '@/components/BottomNav'

  export default {
    components: {Swiper, Slide, LogoOrFont, BottomNav},
    name: 'Index',
    data () {
      return {
        title: '企信查',
        imgUrl: this.GLOBAL.imgUrl,
        imgFile: this.GLOBAL.imgFile,
        newsList: [],
        hotSearchList: [],
        pageIndex: 3,
      }
    },
    methods: {
      goSearch () {

      },
      // 获取热点
      getNewsList () {
        API.hotListUrl().then(res => {
          if (res.code === 0) {
            this.newsList = res.data.records
          }
        })
      },
      //热门搜索
      hotSearch () {
        API.hotSearch({num: 20}).then(res => {
          if (res.code === 0) {
            this.hotSearchList = res.data
          }
        })
      }
    },
    created () {
      this.$store.state.showHeader = false
      this.$store.state.showBottomNav = true
      this.getNewsList()
      this.hotSearch()
    }
  }
</script>

<style scoped lang="less">
  @import "./../styles/index.less";
  @import "./../styles/variable.less";

  .home-banner {
    .h(300);
    .pt(40);
    background: linear-gradient(#2197f2, #0bdbfd);

    .name-img {
      .w(600)
    }

    .search-img {
      .w(600);
      .mt(20);
    }

    .desc-img {
      .w(500);
      .mt(20);
    }
  }

  .home-search-group {
    .w(700);
    .h(140);
    .b-radius(5);
    .margin(-30, 25, 0, 25);
    background: @body-bg-white;
    justify-content: space-around;

    li {
      .w(120);
      .h(120);
      .mt(10);
      text-align: center;

      img {
        width: 70%;
      }
    }
  }

  .mswipe {
    .h(140);
    .mt(20);

    img {
      width: 100%;
    }
  }

  .hot-news {
    .h(60);
    .lh(60);
    background: @body-bg-white;

    .left {
      .w(170);

      img {
        .w(50);
        .h(40);
        .mt(10);
        .ml(10)
      }

      span {
        .w(100);
        .fs(20)
      }
    }

    .right {
      .w(560);
      color: @base-color;

      .hot-news-list {
        .t-left {
          .w(560);
          .h(60);
          .ellipsis();
        }
      }
    }
  }

  .guess-like {
    .w(720);
    background: @body-bg-white;
    .b-radius(5);
    .margin(20, 15);
    .padding(10, 0);

    .guess-list {
      width: 100%;
      .h(260);
      overflow-x: auto;
      overflow-y: hidden;
      -webkit-overflow-scrolling: touch;
      white-space: nowrap;

      li {
        display: inline-block;
        width: 24%;
        .margin(0, 10);
      }
    }
  }

  .index-column-title {
    justify-content: center;

    span {
      width: 30%;
      height: 1px;
      .mt(20)
    }

    span:nth-child(1) {
      background: linear-gradient(to right, #fafafa, #b5b5b5);
    }

    span:nth-child(3) {
      background: linear-gradient(to right, #b5b5b5, #fafafa);
    }

    a {
      width: 30%;
      .lh(40);
      color: @base-font-color;
      font-size: 14px;
    }
  }

  .hot-search {
    .padding(10, 0);
    background: @body-bg-white;

    .hot-com li {
      .w(720);
      .h(140);
      .margin(10, 15);
      .b-radius(5);
      .padding(10, 5);
      -webkit-box-shadow: 0 2px 2px 3px #F3F3F3;
      -moz-box-shadow: 0 2px 2px 3px #F3F3F3;
      box-shadow: 0 2px 2px 3px #F3F3F3;

      .logo {
        width: auto;
        .ml(10);
        .mt(15)
      }

      .com-info {
        width: 70%;
        .ml(15);
        .lh(40);

        .companyName {
          width: 100%;
          .ellipsis();
          .fs(30);
          .lh(60);
          color: @base-font-color;
        }
      }
    }
  }
</style>
