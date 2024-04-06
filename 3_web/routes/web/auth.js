const express = require('express')
const router = express.Router()
const userModel = require('../../models/userhModel')
const md5 = require('md5')

// 注册页面
router.get('/reg', (req, res) => {
  res.render('auth/reg')
})

// 注册操作
router.post('/reg', (req, res) => {
  const { username, password } = req.body
  if (!username) {
    return res.send('用户名不能为空')
  } else if (!password) {
    return res.send('密码不能为空')
  }
  userModel
    .create({ username, password: md5(password) })
    .then(() => {
      res.render('success', { msg: '注册成功', url: 'auth/login', flag: '1' })
    })
    .catch(() => {
      res.status(500).send('注册失败')
    })
})

// 登录页面
router.get('/login', (req, res) => {
  res.render('auth/login')
})

// 登录操作
router.post('/login', (req, res) => {
  const { username, password } = req.body
  if (!username) {
    return res.send('用户名不能为空')
  } else if (!password) {
    return res.send('密码不能为空')
  }
  userModel
    .findOne({ username, password: md5(password) })
    .then(res1 => {
      if (!res1) {
        return res.status(500).send('用户名或密码输入错误')
      }
      req.session.username = res1.username
      req.session._id = res1._id
      res.render('success', { msg: '登录成功', url: 'account', flag: '1' })
    })
    .catch(() => {
      res.status(500).send('登录失败')
    })
})

// 退出登录操作
router.post('/logout', (req, res) => {
  res.render('success', { msg: '退出成功', url: 'login', flag: '1' })
})

module.exports = router
