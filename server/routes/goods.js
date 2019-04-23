var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Goods = require('../models/goods')

// 连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/dumall')
//账号密码连接
// mongoose.connect('mongodb:root:123465//127.0.0.1:27017/dumall')

// 链接成功
mongoose.connection.on('connected', function () {
  console.log('MongoDB connected success.')
})

mongoose.connection.on('error', function () {
  console.log('MongoDB connected fail.')
})
// 断开连接
mongoose.connection.on('disconnected', function () {
  console.log('MongoDB connected disconnected.')
})

/**
 * 查询商品列表
 */
router.get('/list', function (request, response, next) {
  // response.send('hello,goods')
  let page = parseInt(req.param('page'))
  let pageSize = parseInt(req.param('pageSize'))
  let sort = req.param('sort')
  let skip = (page - 1) * pageSize // 跳过多少条
  let params = {}
  let goosModel = Goods.find(params).skip(skip).limit(pageSize)
  goosModel.sort({'salePrice': sort})
  goosModel.exec(function (err, doc) {
    if (err) {
      response.json({
        status: '1',
        message: err.message
      })
    } else {
      response.json({
        status: '0',
        message: 'ok',
        result: {
          count: doc.length,
          list: doc
        }
      })
    }
  })
})

// 加入购物车
router.post('/goods/addCart', function (req, res, next) {
  var userId = '10000' // 假设
  var productId = req.body.productId // post取参数  get:req.params
  var User = require('../models/user')
  User.findOne({userId: userId}, function (err, userDoc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      if (userDoc) {
        let goodsItem = ''
        userDoc.cartList.forEach(function (item) { //如果购物车有商品了
          if (item.productId == productId) {
            goodsItem = item
            item.productNum++
          }
        })
        if (goodsItem) {
          userDoc.save(function (err2, res) {
            if (err2) {
              res.json({
                status: '1',
                msg: err.message
              })
            } else {
              res.json({
                status: '0',
                msg: 'ok',
                result: 'success'
              })
            }
          })
        } else {
          Goods.findOne({productId: productId}, function (err1, data) {
            if (err) {
              res.json({
                status: '1',
                msg: err.message
              })
            } else {
              if (data) {
                data.productNum = 1
                data.checked = 1
                userDoc.cartList.push(data)
                userDoc.save(function (err2, res) {
                  if (err2) {
                    res.json({
                      status: '1',
                      msg: err.message
                    })
                  } else {
                    res.json({
                      status: '0',
                      msg: 'ok',
                      result: 'success'
                    })
                  }
                })
              }
            }
          })
        }

      }
    }
  })
})

module.exports = router
