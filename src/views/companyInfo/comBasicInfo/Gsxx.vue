<template>
  <div>
    <Header title="工商信息" :isRightDepth="true"></Header>
    <div class="block">
      <div class="line t-left" v-if="Object.keys(comBasicInfo).length">
        <span>法人代表：</span>
        <a class="f-click" href="javascript:;">{{comBasicInfo.legalPerson}}</a>
      </div>
      <div class="line t-left">
        <span>注册资本：</span>
        <a class="f-click" href="javascript:;">{{comBasicInfo.registeredCapital+comBasicInfo.registeredCapitalUnit}}</a>
      </div>
      <div class="line t-left">
        <span>注册时间：</span>
        <a class="f-click" href="javascript:;">{{comBasicInfo.registrationDate | delhms}}</a>
      </div>
      <div class="line t-left">
        <span>经营状态：</span>
        <a class="f-click" href="javascript:;">{{comBasicInfo.state}}</a>
      </div>
    </div>
    <div class="block">
      <div class="line t-left">
        <span>工商注册号：</span>
        <a class="f-click" href="javascript:;">{{comBusiness.registrationCode}}</a>
      </div>
      <div class="line t-left">
        <span>组织机构代码：</span>
        <a class="f-click" href="javascript:;">{{comBusiness.organizationCode}}</a>
      </div>
      <div class="line t-left">
        <span>纳税人识别号：</span>
        <a class="f-click" href="javascript:;">{{comBusiness.taxesCode}}</a>
      </div>
      <div class="line t-left">
        <span>统一信用代码：</span>
        <a class="f-click" href="javascript:;">{{comBusiness.creditCode}}</a>
      </div>
      <div class="line t-left">
        <span>企业类型：</span>
        <a class="f-click" href="javascript:;">{{comBusiness.enterpriseType}}</a>
      </div>
      <div class="line t-left">
        <span>行业：</span>
        <a class="f-click" href="javascript:;">{{comBusiness.industryName}}</a>
      </div>
    </div>
    <div class="block">
      <div class="line t-left">
        <span>营业期限：</span>
        <a class="f-click" href="javascript:;">{{comBusiness.businessTerm}}</a>
      </div>
      <div class="line t-left">
        <span>核准日期：</span>
        <a class="f-click" href="javascript:;">{{comBusiness.approvedDate | delhms}}</a>
      </div>
      <div class="line t-left">
        <span>登记机关：</span>
        <a class="f-click" href="javascript:;">{{comBusiness.registrationAuthority}}</a>
      </div>
      <div class="line t-left">
        <span>英文名：</span>
        <a class="f-click" href="javascript:;">{{comBusiness.englishName ? comBusiness.englishName: '企业选择不公开'}}</a>
      </div>
      <div class="line t-left">
        <span>注册地址：</span>
        <a class="f-click" href="javascript:;">{{comBusiness.registeredAddress}}</a>
      </div>
      <div class="line t-left">
        <span>经营范围：</span>
        <a class="f-click" href="javascript:;">{{comBusiness.businessScope}}</a>
      </div>
    </div>
  </div>
</template>

<script>
  import * as API from 'api/api'
  import {mapState} from 'vuex'
  import Header from '@/components/Header'

  export default {
    components: {Header},
    data () {
      return {
        comBasicInfo: {},
        comBusiness: {},
        comExpand: {}
      }
    },
    computed: {
      ...mapState(['companyId'])
    },
    methods: {
      comHead () {
        API.comHead({companyId: '59881302'}).then(res => {
          if (res.code == 0) {
            this.comBasicInfo = res.data.comBasic
            this.comBusiness = res.data.comBusiness
            this.comExpand = res.data.comExpand
          }
        })
      },
    },
    created () {
      this.$store.state.showHeader = true
      this.$store.state.showBottomNav = false
      console.log(this.companyId)
      this.comHead()
    }
  }
</script>

<style scoped lang="less">
  @import "./../../../styles/index.less";
  @import "./../../../styles/variable.less";

  .block {
    .w(750);
    .pt(15);
    .pb(15);
    .mt(10);
    background: @body-bg-white;

    .line {
      .w(730);
      .ml(10);
      .mt(25);
      .lh(30);
      .pl(10);
      border-left: solid 2px #2196f4;
    }
  }
</style>
