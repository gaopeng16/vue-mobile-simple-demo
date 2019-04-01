/**
 *
 * 在文件里引入fetch方法和baseUrl，
 * 这里为什么可以简写成'config/index'呢，
 * 需要在'build/webpack.base.conf.js'里 resolve 下配置一下
 * import {fetch, post, patch, put} from 'config/index'
 */
import {fetch, post, patch, put, baseUrl} from 'config/index'

// 首页获取热点
export function hotListUrl () {
  return fetch('/api/app/buss/news/mtrp/list')
}

// 首页热门搜索
export function hotSearch (params) {
  return fetch('/api/app/buss/hotSport/hotSport', params)
}

//登录接口
export function login (params) {
  return post('/api/app/buss/user/login', params)
}

//获取热搜接口
export function hotSport (params) {
  return fetch('/api/app/buss/hotSport/hotSport', params)
}

// 非VIP搜索
export function commonSearch (params) {
  return fetch('/api/app/search/commonSearch/' + params.page, params)
}

// VIP搜索
export function vipSearch (params) {
  return fetch('/api/app/search/vipSearch/' + params.page, params)
}

// 联想搜索
export function relatedSearch (params) {
  return fetch('/api/app/search/related', params)
}

// 获取企业头信息
export function comHead (params) {
  return fetch('/api/app/buss/companyInfo/comHead', params)
}

// 获取企业详细信息统计
export function comCount (params) {
  return fetch('/api/app/buss/companyInfo/count', params)
}

