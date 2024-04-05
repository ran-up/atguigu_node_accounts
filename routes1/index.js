var express = require('express')
var router = express.Router()

// 导入 lowdb
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync(__dirname + '/../data/db.json')
// 读取 db 对象
const db = low(adapter)
// 导入shortid
const shortid = require('shortid')

// 记账列表
router.get('/account', function (req, res, next) {
  const lists = db.get('accounts').value()
  res.render('list', { lists })
})
// 新增记账
router.get('/account/create', function (req, res, next) {
  res.render('create')
})

router.post('/account', (req, res) => {
  // 获取请求体数据
  // console.log(req.body)
  const id = shortid.generate()
  db.get('accounts')
    .unshift({ id, ...req.body })
    .write()
  res.render('success', { msg: '添加成功', url: '/account', flag: '1' })
})

// 删除
router.get('/account/:id', (req, res) => {
  const id = req.params.id
  db.get('accounts').remove({ id }).write()
  res.render('success', { msg: '删除成功', url: '/account', flag: '0' })
})

module.exports = router
