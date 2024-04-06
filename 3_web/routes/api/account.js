var express = require('express')
var router = express.Router()
const moment = require('moment')
const accountModel = require('../../models/accountModel')

// 记账列表
router.get('/account', function (req, res, next) {
  accountModel
    .find()
    .sort({ time: -1 })
    .then(res1 => {
      res.json({
        code: '0000',
        msg: '读取成功',
        data: res1
      })
    })
    .catch(err => {
      res.json({
        code: '2001',
        msg: '获取失败',
        data: null
      })
    })
})

// 新增账单
router.post('/account', (req, res) => {
  console.log(req.body)
  if (!req.body.title) {
    res.json({
      code: '2002',
      msg: '标题不能为空',
      data: null
    })
    return
  } else if (!(req.body.type === 0 || req.body.type === 1)) {
    res.json({
      code: '2003',
      msg: '类型不能为空',
      data: null
    })
    return
  } else if (!req.body.time) {
    res.json({
      code: '2004',
      msg: '时间不能为空',
      data: null
    })
    return
  } else if (!req.body.account) {
    res.json({
      code: '2005',
      msg: '金额不能为空',
      data: null
    })
    return
  }
  accountModel
    .create({
      ...req.body,
      time: moment(req.body.time).toDate()
    })
    .then(res1 => {
      res.json({
        code: '0000',
        msg: '新增成功',
        data: res1
      })
    })
    .catch(err => {
      res.json({
        code: '2002',
        msg: '新增失败',
        data: null
      })
    })
})

// 删除
router.delete('/account/:id', (req, res) => {
  accountModel
    .deleteOne({ _id: req.params.id })
    .then(res1 => {
      res.json({
        code: '0000',
        msg: '删除成功',
        data: `成功删除${res1.deletedCount}条数据`
      })
    })
    .catch(err => {
      res.json({
        code: '2003',
        msg: '删除失败',
        data: null
      })
    })
})

// 获取单条账单信息
router.get('/account/:id', (req, res) => {
  findAccount(req.params.id, res)
})

router.patch('/account/:id', (req, res) => {
  const _id = req.params.id
  accountModel
    .updateOne({ _id }, req.body)
    .then(res1 => {
      // 这里只是返回了更新的数据，但是不是某一条的具体信息，所以需要重新查询一次
      // res.json({
      //   code: '0000',
      //   msg: '更新成功',
      //   data: res1
      // })
      findAccount(_id, res)
    })
    .catch(err => {
      res.json({
        code: '2005',
        msg: '更新失败',
        data: null
      })
    })
})

function findAccount(_id, res) {
  accountModel
    .findById({ _id })
    .then(res1 => {
      res.json({
        code: '0000',
        msg: '查询成功',
        data: res1
      })
    })
    .catch(err => {
      res.json({
        code: '2004',
        msg: '查询失败',
        data: null
      })
    })
}

module.exports = router
