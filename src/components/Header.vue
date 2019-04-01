<template>
  <div class="header">
    <mt-header fixed :title="title" :class="[isDepthSearch?'depth-color':'']">
      <router-link to="/search" slot="left">
        <mt-button v-if="isBack" icon="back">返回</mt-button>
      </router-link>
      <mt-button v-if="isRight" slot="right">{{rightTxt}}</mt-button>
      <mt-button v-if="isRightDepth" slot="right">
        <router-link
          :to="{path:'/companyDepthInfo',query:{companyName:companyName,isListed:isListed}}">
          <span class="depth-color">深度<br>查询</span>
        </router-link>
      </mt-button>
    </mt-header>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    props: {
      title: {
        type: String,
        request: true
      },
      isBack: {
        type: Boolean,
        default: true
      },
      isRight: {
        type: Boolean,
        default: false
      },
      rightTxt: {
        type: String,
        default: ''
      },
      isRightDepth: {
        type: Boolean,
        default: false
      },
      depthSearchUrl: {
        type: '',
        default: ''
      },
      isDepthSearch: {
        type: Boolean,
        default: false
      },
      isListed: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      ...mapState(['companyName'])
    }
  }
</script>

<style scoped>
  .depth-color {
    color: #F4CD14;
  }
</style>
