<template>
  <div>
    <div class="card oh t-center"
         :style="{background: logoUrl ? 'rgba(0,0,0,0)' : bgColor,width:w+'px',height:h+'px',lineHeight:lh+'px',padding: logoUrl ? '0px' : '4px',}">
      <img v-if="logoUrl && !isHttpUrl" :src="imgFile+logoUrl">
      <img v-if="logoUrl && isHttpUrl" :src="logoUrl">
      <div v-if="isPeople">{{shortNameA}}</div>
      <div v-if="shortName.length > 2 && !isPeople">
        <span>{{shortNameT}}</span>
        <span>{{shortNameB}}</span>
      </div>
      <div v-else>{{shortNameA}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LogoOrFont',
    props: {
      w: {
        type: Number,
        default: 50
      },
      h: {
        type: Number,
        default: 50
      },
      lh: {
        type: Number,
        default: 21
      },
      fs: {
        type: Number,
        default: 16
      },
      logoUrl: {
        type: String,
        default: ''
      },
      shortName: {
        type: String,
        default: ''
      },
      isPeople: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        imgFile: this.GLOBAL.imgFile,
        shortNameA: '',
        shortNameT: '',
        shortNameB: '',
        colorArr: [
          '#C69684',
          '#5ACFF7',
          '#73DB73',
          '#5ACFF7',
          '#D696EF',
          '#84B2F7'
        ],
        bgColor: '#84B2F7',
        /*styleObj: {
          width: this.w + 'px',
          height: this.h + 'px',
          lineHeight: this.lh + 'px',
          fontSize: this.fs + 'px',
          padding: this.logoUrl ? '0px' : '4px',
          background: this.logoUrl ? 'rgba(0,0,0,0)' : '#84B2F7'
        },*/
        isHttpUrl: false,

      }
    },
    methods: {
      setShortName () {
        if (this.isPeople) {
          this.shortNameA = this.shortName.substr(0, 1)
          return
        }
        if (this.shortName && this.shortName.length > 2) {
          this.shortNameT = this.shortName.substr(0, 2)
          if (this.shortName.substr(2).length > 2) {
            this.shortNameB = this.shortName.substr(2, 2)
          } else {
            this.shortNameB = this.shortName.substr(2)
          }
        } else {
          this.shortNameA = this.shortName
        }
      }
    },
    created () {
      this.bgColor = this.colorArr[Math.floor(Math.random() * this.colorArr.length)]
      this.setShortName()
      this.isHttpUrl = this.logoUrl && /^(http)*$/.test(this.logoUrl) ? true : false
    }
  }
</script>

<style scoped lang="less">
  @import "./../styles/index.less";
  @import "./../styles/variable.less";

  .card {
    .b-radius(5);
    box-sizing: border-box;
    color: #ffffff;
    font-weight: bold;

    img {
      width: 100%;
    }
  }
</style>
