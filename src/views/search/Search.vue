<template>
  <div>
    <div class="search-header">
      <div class="back left" @click="goBack"><i class="iconfont icon-back"></i></div>
      <div class="search left">
        <input v-focus v-model.trim="keyWord" type="text" placeholder="请输入企业名称、人名、产品名或其他关键字">
      </div>
      <div class="btn right" @click="goSearch">搜索</div>
    </div>
    <div style="height: 40px;width: 100%"></div>
    <!-- 热门搜索 & 最近搜索-->
    <div v-if="!isSearch && !keyWord">
      <!--热门搜索-->
      <div class="hotsearch">
        <div class="title t-left">热门搜索</div>
        <ul class="hotsearch-list flex-container-row">
          <li v-for="(item,index) in hotSearchList" @click="goCompanyInfo(item.companyId)">{{item.hotSpot}}</li>
        </ul>
      </div>
      <!--最近搜索-->
      <div class="recent-search" v-if="recentSearchArr.length > 0">
        <div class="title t-left">最近搜索</div>
        <ul class="recent-search-list t-left">
          <li v-for="(item,index) in recentSearchArr" @click="recentItem(item)">{{item}}</li>
        </ul>
      </div>
    </div>
    <!-- 联想搜索 -->
    <ul v-if="!isSearch && keyWord" class="related-search t-left">
      <li :key="index" v-for="(item,index) in relatedSearchArr" @click="handleRelatedSearch(item.companyName)">
        {{item.companyName}}
      </li>
    </ul>
    <!-- 搜索的结果 -->
    <div v-if="isSearch && keyWord" class="search-result">
      <div class="gj-search"></div>
      <div class="result-total t-left">
        搜索到<span class="f-red">{{total}}</span>家公司
        <span v-if="!loginInfo.vipLevel" class="f-red">,VIP用户可查看5000+家公司</span>
      </div>
      <div class="search-list">
        <NoData v-if="noDate"></NoData>
        <mt-loadmore v-else :top-method="loadTop" ref="loadmore" class="loadmorewrap" id="scorllwrapper"
                     :bottom-method="loadBottom" :bottom-all-loaded="loading" :auto-fill="false" :bottomDistance="10">
          <div>
            <div class="item" v-for="(item,index) in searchList" @click="goCompanyInfo(item.id,item.companyName)">
              <div class="logo-name oh">
                <div class="logo left">
                  <LogoOrFont :logoUrl="item.logoUrl" :shortName="item.companyName | delHTML"></LogoOrFont>
                </div>
                <div class="name left t-left" v-html="item.companyName">{{item.companyName}}</div>
              </div>
              <div class="tips t-left">
                <span :class="[/(吊销)|(注销)/g.test(item.State)?'red':'green']">{{item.State | comState}}</span>
              </div>
              <div class="item-info oh">
                <div class="left">
                  <span>法定代表人</span><br>
                  <i class="f-click">{{item.legalPerson}}</i>
                </div>
                <a class="left"></a>
                <div class="left">
                  <span>注册资本</span><br>
                  <i>{{item.registeredCapital+item.registeredCapitalUnit}}</i>
                </div>
                <a class="left"></a>
                <div class="left">
                  <span>成立日期</span><br>
                  <i>{{item.registrationDate | formatDates}}</i>
                </div>
              </div>
              <div class="score" :class="[/(吊销)|(注销)/g.test(item.State)?'score-gray':'']">{{item.creditScore}}</div>
            </div>
          </div>
        </mt-loadmore>
      </div>
    </div>
  </div>
</template>

<script>
  import * as API from 'api/api'
  import * as utils from '@/utils'
  import {mapState, mapMutations} from 'vuex'
  import LogoOrFont from '@/components/LogoOrFont'
  import NoData from '@/components/NoData'
  import {Loadmore} from 'mint-ui'

  export default {
    components: {LogoOrFont, Loadmore, NoData},
    data () {
      return {
        isSearch: false, // 是否去搜索
        keyWord: '',
        hotSearchList: [],
        page: 1,
        searchArguments: {}, // 搜索的参数
        relatedSearchArr: [], // 联想查询的数组
        total: 0, // 搜索到的总条数
        searchList: [], // 搜索到的数据数组
        loading: false,
        hasMore: true, // 默认还有更多的数据
        noDate: false, // 默认查询到数据了
        0: [],

        scopeStr: 1, // 搜索范围
        capitalStr: 1, // 注册资本
        dateStr: 1, // 成立年限
        stateStr: 1, // 经营状态
        areaStr: 1, // 区域
        tradeStr: '100', // 行业
        sbStr: 1, // 商标
        zlStr: 1, // 专利
        lxStr: 1, // 联系电话
        sxStr: 1, // 失信信息
        sort: 1,

        capitalArr: [
          '全部',
          '0万-100万',
          '100万-200万',
          '200万-500万',
          '500万-1000万',
          '1000万以上'
        ],
        dateArr: ['全部', '1年内', '1-5年', '5-10年', '10-15年', '15年以上'],
        stateArr: [
          '不限',
          '吊销',
          '在业',
          '在营',
          '存续',
          '开业',
          '注销',
          '迁出'
        ],
        sbArr: ['全部', '有商标', '无商标'],
        zlArr: ['全部', '有专利', '无专利'],
        sxArr: ['全部', '有失信信息', '无失信信息'],
        lxArr: ['全部', '有联系电话', '无联系电话'],
      }
    },
    computed: {
      ...mapState(['loginInfo'])/*,
      recentSearchArr () {
        return Array.from(new Set(JSON.parse(window.localStorage.getItem('recentSearch')))) || []
      }*/
    },
    methods: {
      goBack () {
        this.$router.goBack()
      },
      // 搜索
      goSearch (init) {
        if (init) {
          this.page = 1
          this.hasMore = true
        }
        const _this = this
        if (this.keyWord !== '') {
          this.setRecentSearch(this.keyWord) //设置最近搜索
          this.isSearch = true
          if (this.loginInfo.vipLevel == 0) {
            this.searchArguments = {
              termStr: this.keyWord,
              scopeStr: this.scopeStr,
              capitalStr: this.capitalStr,
              dateStr: this.dateStr,
              stateStr: this.stateStr,
              areaStr: this.areaStr,
              tradeStr: this.tradeStr,
              page: this.page,
              sort: this.sort
            }
            API.commonSearch(this.searchArguments).then(res => {
              _this.handleSearchRes(res)
            })
          } else {
            this.searchArguments = {
              termStr: this.keyWord,
              scopeStr: this.scopeStr,
              capitalStr: this.capitalStr,
              dateStr: this.dateStr,
              stateStr: this.stateStr,
              areaStr: this.areaStr,
              tradeStr: this.tradeStr,
              sbStr: this.sbStr,
              zlStr: this.zlStr,
              lxStr: this.lxStr,
              sxStr: this.sxStr,
              page: this.page,
              sort: this.sort
            }
            API.vipSearch(this.searchArguments).then(res => {
              _this.handleSearchRes(res)
            })
          }
        } else {
          utils.gpToast('请输入要搜索的内容')
        }
      },
      // 处理搜索结果
      handleSearchRes (res) {
        if (res.code == 0) {
          if (res.data.counts > 0) {
            this.total = res.data.counts
            if (this.page == 1) {
              this.searchList = res.data.companyInfos
            } else {
              this.searchList = this.searchList.concat(res.data.companyInfos)
            }
            if (res.data.companyInfos.length < 10 && this.page > 1) {
              this.hasMore = false
            }
            if (!this.hasMore) {
              this.loading = true
              this.$refs.loadmore.onBottomLoaded()
            }
          } else {
            this.noDate = true
          }
        } else {
          this.noDate = true
        }
      },
      // 上滑加载下一页
      loadBottom () {
        this.page++
        this.goSearch()
      },
      // 下拉刷新
      loadTop () {
        this.$refs.loadmore.onTopLoaded()
        this.goSearch(true)
      },
      // 获取热搜
      getHotSearch () {
        this.hotSearchList = []
        API.hotSport({num: 20}).then(res => {
          if (res.code == 0) {
            this.hotSearchList = res.data
          }
        })
      },
      // 联想搜索
      relatedSearch () {
        API.relatedSearch({termStr: this.keyWord}).then(res => {
          if (res.code == 0) {
            this.relatedSearchArr = res.data
          }
        })
      },
      // 点击联想搜索的item
      handleRelatedSearch (companyName) {
        this.keyWord = companyName
        this.goSearch()
      },
      // 设置最近搜索
      setRecentSearch (keyWord) {
        this.recentSearchArr.unshift(keyWord)
        this.recentSearchArr = Array.from(new Set(this.recentSearchArr))
        let rsa = this.recentSearchArr
        if (rsa > 10) {
          rsa = rsa.slice(0, 10)
        }
        window.localStorage.setItem('recentSearch', JSON.stringify(rsa))
      },
      // 点击最近搜索
      recentItem (termStr) {
        this.keyWord = termStr
        this.goSearch(true)
      },
      // 跳转到公司详情页
      goCompanyInfo (companyId) {
        this.$router.push({path: '/companyInfo', query: {companyId, companyId}})
      }
    },
    watch: {
      keyWord (val, oldVal) {
        console.log(val)
        this.relatedSearch()
        if (val == '') {
          this.isSearch = false
        }
      }
    },
    created () {
      this.$store.state.showHeader = false
      this.$store.state.showBottomNav = false
      this.isSearch = false
      this.recentSearchArr = JSON.parse(window.localStorage.getItem('recentSearch')) || []
      this.getHotSearch()
    }

  }
</script>

<style scoped lang="less">
  @import "./../../styles/index.less";
  @import "./../../styles/variable.less";

  .search-header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 40px;
    background: #2098F2;

    .back {
      font-size: 20px;
    }

    .back, .btn {
      width: 50px;
      line-height: 40px;
      text-align: center;
      color: #ffffff;
    }

    .search {
      width: calc(100% - 100px);
      margin-top: 3px;

      input {
        box-sizing: border-box;
        outline: none;
        width: 100%;
        height: 34px;
        line-height: 34px;
        padding: 0 8px;
        border: none;
        background: @body-bg-white;
      }
    }
  }

  /*联想搜索*/
  .related-search {
    li {
      width: 100%;
      .lh(60);
      text-indent: 20px;
      color: #676767;
      border-bottom: solid 1px #E5E5E5;
    }
  }

  /*热搜*/
  .hotsearch {
    .mt(20);

    .title {
      height: 40px;
      margin-left: 10px;
      line-height: 40px;
      text-indent: 30px;
      background: url("../../../static/images/search_r.png") left center no-repeat;
      background-size: 20px 20px;
    }

    .hotsearch-list {
      justify-content: flex-start;
      flex-wrap: wrap;

      li {
        .border-solid(1, #ccc);
        .b-radius(6);
        .margin(10, 10);
        .padding(10, 10);
      }
    }
  }

  /*最近搜索*/
  .recent-search {
    .title {
      height: 40px;
      margin-left: 10px;
      line-height: 40px;
      text-indent: 30px;
      background: url("../../../static/images/search_z.png") left center no-repeat;
      background-size: 20px 20px;
    }

    .recent-search-list {
      width: 94%;
      margin: 0 auto;

      li {
        width: 100%;
        .lh(60);
        text-indent: 20px;
        color: #676767;
        border-bottom: solid 1px #E5E5E5;
      }
    }
  }

  /*搜索结果*/
  .search-result {
    .result-total {
      height: 40px;
      line-height: 40px;
      text-indent: 20px;
    }

    .search-list {
      height: calc(100vh - 80px);
      overflow: scroll;

      .item {
        box-sizing: border-box;
        position: relative;
        .padding(20, 20);
        .mb(10);
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

        .score {
          position: absolute;
          width: 30px;
          height: 30px;
          line-height: 30px;
          right: 20px;
          top: 20px;
          .border-solid(2, #2196f4);
          -webkit-border-radius: 50%;
          -moz-border-radius: 50%;
          border-radius: 50%;
          color: #2196f4;
        }

        .score-gray {
          color: #ccc;
          .border-solid(2, #ccc);
        }
      }
    }
  }

</style>
