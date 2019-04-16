var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Goods = require('../models/goods')

// 连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/domall')

mongoose.connection.on('connected', function () {
  console.log('MongoDB connected success.')
})

mongoose.connection.on('error', function () {
  console.log('MongoDB connected fail.')
})

mongoose.connection.on('disconnected', function () {
  console.log('MongoDB connected disconnected.')
})

router.get('/', function (request, response, next) {
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

module.exports = router
