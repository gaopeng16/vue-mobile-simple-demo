<template>
  <router-link :to="'/'+url">
    <li class="plate-item left oh">
      <div class="icon left">
        <img :src="'/static/images/'+iconName+'.png'">
      </div>
      <p class="left">{{name}}</p>
      <span class="right">{{total}}</span>
    </li>
  </router-link>
</template>

<script>
  export default {
    name: 'PlateItem',
    props: {
      url: {
        type: String,
        request: true
      },
      name: {
        type: String,
        request: true
      },
      total: {
        type: Number,
        request: true
      },
      iconName: {
        type: String,
        request: true
      }
    }
  }
</script>

<style scoped lang="less">
  @import "./../styles/index.less";
  @import "./../styles/variable.less";

  .plate-item {
    .w(320);
    .lh(40);
    .margin(20, 20, 20, 20);

    .icon {
      .w(30);
      .h(40);
      .mr(10);

      & > img {
        width: 100%;
        max-height: 100%;
      }
    }

    span {
      .h(30);
      overflow: visible;
      color: #7e8c8d;

      img {
        .w(30);
        .h(30);
        .mt(5)
      }
    }
  }
</style>
