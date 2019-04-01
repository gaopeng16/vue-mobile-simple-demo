<template>
  <div class="footer flex-container-row">
    <div class="item" v-for="(item,index) in items" :class="[item.cls,{on:index == idx}]"
         @click="changePage(item.push)">
      <span :class="{'search-icon':index == 2}"><img
        :src="index==idx?item.iconSelect:(index==2?item.iconSelect:item.icon)"></span>
      <p v-if="index != 2" :class="['colorChange',{on:index===idx}]">{{item.name}}</p>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    props: ['idx'],
    data () {
      return {
        items: [
          {
            cls: 'index',
            name: '首页',
            push: '/',
            icon: '../static/images/tab1_normal.png',
            iconSelect: '../static/images/tab1_selected.png'
          },
          {
            cls: 'category',
            name: '分类',
            push: '/category',
            icon: '../static/images/tab2_normal.png',
            iconSelect: '../static/images/tab2_selected.png'
          },
          {
            cls: 'search',
            name: '搜索',
            push: '/search',
            icon: '../static/images/search_normal.png',
            iconSelect: '../static/images/search_selected.png'
          },
          {
            cls: 'find',
            name: '发现',
            push: '/find',
            icon: '../static/images/tab3_normal.png',
            iconSelect: '../static/images/tab3_selected.png'
          },
          {
            cls: 'mine',
            name: '我',
            push: '/mine',
            icon: '../static/images/tab4_normal.png',
            iconSelect: '../static/images/tab4_selected.png'
          }
        ]
      }
    },
    methods: {
      changePage (url) {
        this.$router.toGo(url)
      }
    }
  }
</script>

<style scoped lang="less">
  @import "./../styles/index.less";
  @import "./../styles/variable.less";

  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    box-sizing: border-box;
    width: 100%;
    .h(90);
    background: white;
    border-top: solid 1px #ccc;

    .item {
      flex: 1;

      img {
        .w(45);
        .h(45);
        .mt(8)
      }

      p {
        .lh(30);
        .fs(20);
      }

      .search-icon {
        position: absolute;
        display: block;
        .w(80);
        .h(80);
        .padding(5, 5);
        .ml(-42);
        border-top: solid 1px #ccc;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        background: #ffffff;
        .top(-20);
        .left(375);

        img {
          .w(80);
          .h(80);
          margin: 0 auto;
        }
      }
    }

    .on {
      color: #2196f4;
    }
  }
</style>
