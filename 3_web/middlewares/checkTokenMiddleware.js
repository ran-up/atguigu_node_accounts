const jwt = require('jsonwebtoken')
const { SECRET } = require('../config/config')

module.exports = (req, res, next) => {
  // 获取 token
  const token = req.get('token')

  if (!token) {
    return res.json({
      code: '2001',
      msg: 'token 缺失',
      data: null
    })
  }
  // 检验 token
  jwt.verify(token, SECRET, (err, data) => {
    if (err) {
      return res.json({
        code: '2002',
        msg: 'token 检验失败',
        data: null
      })
    }

    // 记录每个登录的用户信息
    req.user = data

    next()
  })
}
