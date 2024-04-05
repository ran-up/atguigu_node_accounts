/**
 * @param {Function} success 连接成功回调
 * @param {Function} error 连接失败回调
 */
module.exports = function (
  success,
  error = () => {
    console.log('连接失败')
  }
) {
  // 导入 mongoose
  const mongoose = require('mongoose')
  const { DBHOST, DBPORT, DBNAME } = require('../config/config')
  mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`)

  mongoose.connection.once('open', () => {
    success()
  })

  mongoose.connection.on('error', () => {
    error()
  })

  mongoose.connection.on('close', () => {
    console.log('关闭成功')
  })
}
