const mongoose = require('mongoose')

const accountSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    required: true
  },
  type: {
    type: Number,
    required: true,
    default: 0 // 默认支出
  },
  account: {
    type: Number,
    required: true
  },
  remarks: String
})

const accountModel = mongoose.model('accounts', accountSchema)
module.exports = accountModel
