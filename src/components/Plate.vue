<template>
  <div class="plate">
    <div class="plate-title t-left">{{title}}</div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'Plate',
    props: ['title']
  }
</script>

<style scoped lang="less">
  @import "./../styles/index.less";
  @import "./../styles/variable.less";

  .plate {
    .w(720);
    .ml(15);
    .mt(10);
    .pt(20);
    .pb(20);
    background: @body-bg-white;

    .plate-title {
      .w(700);
      .ml(10);
      .h(30);
      .lh(30);
      .pl(10);
      border-left: solid 2px #2196f4;
      font-weight: bold;
    }
  }
</style>
