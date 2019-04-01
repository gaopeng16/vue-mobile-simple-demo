/**
 * filter 过滤器
 */
import Vue from 'vue'

export default (function () {
  /**
   * 去掉时分秒
   * 如 12:22:12 12:33:45 --> 12:22:12
   */
  Vue.filter('delhms', function (val) {
    return val.substr(0, 10)
  })
  /**
   * 制保留2位小数
   * 例如：2，会在2后面补上00.即2.00
   */
  Vue.filter('toDecimal2', x => {
    var f = parseFloat(x)
    if (isNaN(f)) {
      return false
    }
    var f = Math.round(x * 100) / 100
    var s = f.toString()
    var rs = s.indexOf('.')
    if (rs < 0) {
      rs = s.length
      s += '.'
    }
    while (s.length <= rs + 2) {
      s += '0'
    }
    return s
  })
  /**
   * 名字，身份证，银行卡，隐藏部分数字变‘*’号
   * plusXing(前面保留位数，后面保留位数）
   */
  Vue.filter('plusXing', (str, frontLen, endLen) => {
    var len = str.length - frontLen - endLen
    var xing = ''
    for (var i = 0; i < len; i++) {
      xing += '*'
    }
    return str.substring(0, frontLen) + xing + str.substring(str.length - endLen)
  })
  /**
   * 时间过滤
   * date:'yyyy-MM-dd'
   */
  Vue.filter('fmtDateStr', (date) => {
    if (!date) return ''
    var temp = date.split(' ')[0].split('-')
    return temp.join('/')
  })
  Vue.filter('fmtDateStr2', (date) => {
    if (!date) return ''
    var temp = date.split(' ')[0].split('-')
    return temp[0] + '年' + temp[1] + '月' + temp[2] + '日'
  })
  Vue.filter('fmtTimeStr', (date) => {
    if (!date) return ''
    var temp = date.split(' ')[0].split('-')
    return temp.join('/') + ' ' + date.split(' ')[1]
  })
  Vue.filter('fmtTimeStr2', (date) => {
    if (!date) return ''
    var temp = date.split(' ')[0].split('-')
    return temp[0] + '年' + temp[1] + '月' + temp[2] + '日' + ' ' + date.split(' ')[1]
  })

  /**
   * 当前日期过滤器
   * new Date() --> ××年××月××日
   */
  Vue.filter('formatDates', (date) => {
    var date = new Date(date)
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  })
  /**
   * 时间戳转换为日期格式
   * new Date() --> ××年××月××日 ××时××分××秒
   */
  Vue.filter('formatDatel', (date) => {
    function fd (date, fmt) {
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
      }
      for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
          let str = o[k] + ''
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length))
        }
      }
      return fmt
    }

    var date = new Date(date)
    return fd(date, 'yyyy-MM-dd hh:mm:ss')
  })

  /**
   * 过滤企业营业状态
   */
  Vue.filter('comState', (state) => {
    if (state.length > 2) {
      return state.substr(0, 2)
    } else {
      return state
    }
  })

  /**
   * 去掉html标签
   */
  Vue.filter('delHTML', (val) => {
    return val.replace(/<[^>]*>/g, '')
  })
})()
