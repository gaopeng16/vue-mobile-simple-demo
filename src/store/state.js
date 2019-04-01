const state = {
  httpError: {
    hasError: false,
    status: '',
    statusText: ''
  },
  loginInfo: {},
  vipLevel: 0, // 会员类型
  sign: {
    'score': 0
  }, // 签到
  showHeader: true,
  showBottomNav: true,
  companyId: '',
  companyName: ''
}
export default state
