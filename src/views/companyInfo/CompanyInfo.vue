<template>
  <div>
    <Header :title="title" :isRightDepth="true"></Header>
    <div class="item" v-if="Object.keys(comHeadData).length">
      <div class="logo-name oh">
        <div class="logo left">
          <LogoOrFont :logoUrl="comHeadData.comBasic.logoUrl"
                      :shortName="comHeadData.comBasic.shortName"></LogoOrFont>
        </div>
        <div class="name left t-left">{{comHeadData.comBasic.companyName}}</div>
      </div>
      <div class="tips t-left">
        <span :class="[/(吊销)|(注销)/g.test(comHeadData.comBasic.state)?'red':'green']">{{comHeadData.comBasic.state | comState}}</span>
      </div>
      <div class="item-info oh">
        <div class="left">
          <span>法定代表人</span><br>
          <i class="f-click">{{comHeadData.comBasic.legalPerson}}</i>
        </div>
        <a class="left"></a>
        <div class="left">
          <span>注册资本</span><br>
          <i>{{comHeadData.comBasic.registeredCapital+comHeadData.comBasic.registeredCapitalUnit}}</i>
        </div>
        <a class="left"></a>
        <div class="left">
          <span>成立日期</span><br>
          <i>{{comHeadData.comBasic.registrationDate | delhms}}</i>
        </div>
      </div>
      <div class="brief-box oh t-left">
        <p class="brief left">简介:{{comHeadData.newContent}}</p>
        <span class="right f-click" @click="lookComBiref(comHeadData.newContent)">详情</span>
      </div>
    </div>
    <div class="com-imgs flex-container-row">
      <img v-if="Object.keys(comHeadData).length"
           :src="'/static/images/score/score_'+comHeadData.comBasic.creditScore+'.jpg'">
      <img src="../../../static/images/top_map.png">
      <img src="../../../static/images/wtg.png">
    </div>
    <ul class="com-contact-info oh">
      <li>
        <img class="left" src="../../../static/images/set_call.png">
        <span class="left">05372985028</span>
        <a class="right f-click" href="javascript:;" @click="showContact = !showContact">
          联系信息<i :class="['iconfont',showContact?'icon-up':'icon-down']"></i>
        </a>
      </li>
    </ul>
    <transition name="fade">
      <ul class="com-contact-info com-contact-info2" v-if="showContact" style="margin-top: 0;">
        <li>
          <img class="left" src="../../../static/images/ic_dn.png">
          <span class="left">{{comHeadData.comExpand.website}}</span>
        </li>
        <li>
          <img class="left" src="../../../static/images/ic_yx.png">
          <span class="left">{{comHeadData.comExpand.mailbox}}</span>
        </li>
        <li>
          <img class="left" src="../../../static/images/ic_wz.png">
          <span class="left">{{comHeadData.comExpand.companyAddress}}</span>
        </li>
      </ul>
    </transition>
    <Plate title="基本信息">
      <ul class="plate-list oh" v-if="Object.keys(basicInfoCount).length">
        <PlateItem name="工商信息" url="gsxx" :total="basicInfoCount.businessCount" iconName="ic_gv1_1"></PlateItem>
        <PlateItem name="企信风险" :total="basicInfoCount.picRiskCount" iconName="ic_gv5_1"></PlateItem>
        <PlateItem name="资质证书" :total="basicInfoCount.qualificationCount" iconName="ic_gv5_1"></PlateItem>
        <PlateItem name="主要人员" :total="basicInfoCount.mainPersonCount" iconName="ic_gv1_3"></PlateItem>
        <PlateItem name="股东" :total="basicInfoCount.shareholderCount" iconName="ic_gv1_4"></PlateItem>
        <PlateItem name="对外投资" :total="basicInfoCount.investCount" iconName="ic_gv1_5"></PlateItem>
        <PlateItem name="变更记录" :total="basicInfoCount.changeCount" iconName="ic_gv1_6"></PlateItem>
        <PlateItem name="年报" :total="basicInfoCount.annualreportCount" iconName="ic_gv1_7"></PlateItem>
        <PlateItem name="分支机构" :total="basicInfoCount.branchCount" iconName="ic_gv1_8"></PlateItem>
        <PlateItem name="实际控制权" :total="basicInfoCount.holdingCount" iconName="ic_gv_realkongzhi"></PlateItem>
        <PlateItem name="最终受益人" :total="basicInfoCount.humanHoldingCount" iconName="ic_gv_shouyiren"></PlateItem>
        <PlateItem name="股权结构" :total="Number(0)" iconName="ic_gv1_9"></PlateItem>
        <PlateItem name="关系图" :total="Number(0)" iconName="ic_gv1_2"></PlateItem>
      </ul>
    </Plate>
  </div>
</template>

<script>
  import * as API from 'api/api'
  import {mapMutations} from 'vuex'
  import {SET_COMPANY_ID, SET_COMPANY_NAME} from '@/store/mutations-type'
  import Header from '@/components/Header'
  import LogoOrFont from '@/components/LogoOrFont'
  import Plate from '@/components/Plate'
  import PlateItem from '@/components/PlateItem'
  import {MessageBox} from 'mint-ui'

  export default {
    components: {Header, LogoOrFont, Plate, PlateItem, MessageBox},
    data () {
      return {
        title: '公司详情',
        companyId: '',
        comHeadData: {},
        showContact: false,
        basicInfoCount: {}
      }
    },
    methods: {
      ...mapMutations({
        SET_COMPANY_ID,
        SET_COMPANY_NAME
      }),
      // 获取企业头信息
      comHead () {
        API.comHead({companyId: this.companyId}).then(res => {
          if (res.code == 0) {
            this.comHeadData = res.data
            this.SET_COMPANY_ID(this.comHeadData.comBasic.id)
            this.SET_COMPANY_NAME(this.comHeadData.comBasic.companyName)
          }
        })
      },
      // 获取企业详细信息统计
      comCount () {
        API.comCount({companyId: this.companyId}).then(res => {
          console.log('res-->', res)
          if (res.code == 0) {
            this.basicInfoCount = res.data.basicInfoCount
          }
        })
      },
      // 查看公司详情
      lookComBiref (newContent) {
        MessageBox({
          title: '简介',
          message: newContent,
          confirmButtonText: '我知道了'
        })
      },
    },
    created () {
      this.$store.state.showHeader = true
      this.$store.state.showBottomNav = false
      this.companyId = this.$route.query.companyId
      this.comHead()
      this.comCount()
    }
  }
</script>

<style scoped lang="less">
  @import "./../../styles/index.less";
  @import "./../../styles/variable.less";

  .item {
    box-sizing: border-box;
    position: relative;
    .padding(20, 20);
    background: @body-bg-white;

    .logo-name {
      height: 50px;
      line-height: 50px;

      .logo {
        width: 50px;
        height: 50px;
      }

      .name {
        width: calc(100% - 120px);
        .ellipsis();
        .fs(30);
        font-weight: bold;
        text-indent: 10px;
      }
    }

    .tips {
      .ml(120);
      .mt(-20);

      span {
        display: inline-block;
        box-sizing: border-box;
        .padding(5, 5);
        .margin(5, 5)
      }

      .red {
        color: red;
        .border-solid(1, red);
        .b-radius(5)
      }

      .green {
        color: #0AA30A;
        .border-solid(1, #0AA30A);
        .b-radius(5)
      }

      .perple {
        color: #CB88EE;
        background: #F8F0FD;
      }
    }

    .item-info {
      & > div {
        .h(86);
        .pt(14);
        width: calc((100% - 3px) / 3);
        .lh(36);

        span {
          color: @base-color-light;
        }

        i {
          font-style: normal
        }
      }

      & > a {
        width: 1px;
        .h(50);
        .mt(25);
        background: #ccc;
      }
    }

    .brief-box {
      .brief {
        width: 90%;
        .ellipsis();
      }
    }

  }

  .com-imgs {
    background: @body-bg-white;
    justify-content: space-around;

    img {
      width: 32%;
      .h(160)
    }
  }

  .com-contact-info {
    .padding(0, 10);
    .mt(10);
    background: @body-bg-white;

    li {
      box-sizing: border-box;
      .h(70);
      .lh(70);
      border-bottom: solid 1px @border-color;

      img {
        .w(40);
        .h(40);
        .mt(10);
        .ml(10);
        .mr(10)
      }

    }
  }

  .com-contact-info2 {
    span {
      text-align: left;
      .ellipsis();
      .w(600)
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s
  }

  .fade-enter, .fade-leave-active {
    opacity: 0
  }

  .plate-list {
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
  }
</style>
