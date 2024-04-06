const express = require('express')
const router = express.Router()
const userModel = require('../../models/userhModel')
const md5 = require('md5')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../../config/config')

// 登录操作
router.post('/login', (req, res) => {
  const { username, password } = req.body
  if (!username) {
    return res.json({
      code: '3001',
      msg: '用户名不能为空',
      data: null
    })
  } else if (!password) {
    return res.json({
      code: '3002',
      msg: '密码不能为空',
      data: null
    })
  }
  userModel
    .findOne({ username, password: md5(password) })
    .then(res1 => {
      if (!res1) {
        return res.json({
          code: '3003',
          msg: '查找失败',
          data: null
        })
      }

      // 创建当前用户的 token
      const token = jwt.sign(
        {
          username: res1.username,
          _id: res1._id
        },
        SECRET,
        {
          expiresIn: 60 * 60 * 24 * 7
        }
      )

      res.json({
        code: '0000',
        msg: '登录成功',
        data: token
      })
    })
    .catch(() => {
      res.json({
        code: '3004',
        msg: '登录失败',
        data: null
      })
    })
})

// 退出登录操作
router.post('/logout', (req, res) => {
  res.json({
    code: '0000',
    msg: '退出成功',
    data: null
  })
})

module.exports = router
