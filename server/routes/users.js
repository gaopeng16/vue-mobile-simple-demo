var express = require('express')
var router = express.Router()

var User = require('./../models/user')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource')
})

router.get('/test', function (req, res, next) {
  res.send('二级路由')
})

// 登录
router.post('/login', function (req, res, next) {
  var param = {
    userName: req.body.userName,
    userPwd: req.body.userPwd
  }
  User.findOne(param, function (err, userDoc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      if (userDoc) {

        res.cookie('userId', userDoc.userId, {
          path: '/',
          maxAge: 1000 * 60 * 60
        })

        req.session.user = userDoc

        res.json({
          status: '0',
          msg: 'ok',
          result: {
            userName: userDoc.userName
          }
        })
      }
    }
  })
})

// 退出
router.post('/logout', function (req, res, next) {
  res.cookie('userId', '', {path: '/', maxAge: -1})
  res.json({
    status: '0',
    msg: 'ok',
    result: ''
  })

})

module.exports = router
