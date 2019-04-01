import axios from 'axios'
import QS from 'qs'
import * as utils from '@/utils'

/**
 * 定义请求常量
 */
export const TIME_OUT = 10000 // 请求超时时间
export const ERR_OK = true // 请求成功返回状态，字段和后台统一
export const baseUrl = 'https://www.pic11315.com'// 引入全局url，定义在全局变量process.env中，开发环境为了方便转发，值为空字符串

let _this = this;

// 请求超时时间
axios.defaults.timeout = TIME_OUT

// 封装请求拦截
axios.interceptors.request.use(
  config => {
    let token = localStorage.getItem('token') // 获取token
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    config.headers['Authorization'] = ''
    if (token != null) {
      config.headers['Authorization'] = token
    }
    window.vm.$loading.show('loading')
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 封装响应拦截，判断token是否过期
axios.interceptors.response.use(
  response => {
    let {data} = response
    if (data.message === 'token failuer!') { // 如果后台返回的错误标识为token过期，则重新登录
      localStorage.removeItem('token')
      // 进行重新登录操作
    } else {
      window.vm.$loading.hide()
      return Promise.resolve(response)
    }
  }, error => {
    window.vm.$loading.hide()
    utils.gpToast('请求超时', 'error')
    return Promise.reject(error)
  }
)

// 封装get请求
export function fetch (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(response => {
      resolve(response.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// 封装post请求
export function post (url, data = {}) {
  return new Promise((resolve, reject) => {
    data = data ? QS.stringify(data) : data
    axios.post(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}

// 封装patch方法
export function patch (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}

// 封装put方法
export function put (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}
