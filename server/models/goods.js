var mongoose = require('mongoose')
var Schema = mongoose.Schema

// 定义模型的字段，与数据库对应起来
var productSchema = new Schema({
  'productId': String,
  'productName': String,
  'salePrice': Number,
  'productImage': {type: String}
})

// 数据库建集合的时候，一定要加s  -->  goods
module.exports = mongoose.model('Good', productSchema)

//也可以这样，就是管理数据库的goods
//module.exports = mongoose.model('Good', productSchema,'goods')
