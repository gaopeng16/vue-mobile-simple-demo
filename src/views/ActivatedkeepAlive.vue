<template>
  <div>
    <h3>activated配合keep-alive</h3>
    <p>Activated keep-alive 当前页</p>
    <br>
    <router-link to="/keepAlive/child1">
      <button>child1</button>
    </router-link>
    <router-link to="/keepAlive/child2/2">
      <button>child2</button>
    </router-link>
    <router-link to="/keepAlive/child3">
      <button>child3</button>
    </router-link>


    <hr>
    <p class="child-box-ts">以下是装载子模块的</p>
    <div class="child-box">
      <!-- 利用keep-alive
        1.保存了ActivatedKeepAliveChild1 中input radio 的状态
        2. ActivatedKeepAliveChild1中只请求了一次接口
      -->
      <keep-alive include="ActivatedkeepAliveChild1">
        <router-view></router-view>
      </keep-alive>
    </div>
    <div class="main">
      <h1>Main</h1>
      <router-view name="left" style="float:left;width:50%;height:50px;background:#abcdef;"></router-view>
      <router-view name="right" style="float:left;width:50%;height:50px;background: #bbffbb;"></router-view>
    </div>
    <router-link :to="{path:'/keepAliveNext#abc'}">
      <button>去下一页</button>
    </router-link>


  </div>
</template>

<script>
  import * as API from 'api/api'

  export default {
    name: 'ActivatedkeepAlive'
  }
</script>

<style scoped>
  .child-box-ts {
    margin-top: 20px;
  }

  .child-box {
    margin-top: 10px;
    height: 100px;
    border: solid 1px #abcdef;
  }

  .main {
    margin-top: 10px;
    height: 100px;
    border: solid 1px red;
  }
</style>
