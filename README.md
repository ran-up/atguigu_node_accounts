# 简介

学习 node 的一个非常简易的练习项目 -- 记账本

使用 node.js 开发，express-generator 搭建的 express 骨架，mongoose 连接的 mongodb

# 使用到的技术

1. node.js
2. ejs
3. express
4. lowdb
5. mongodb
6. mongoose
7. express-session -- 管理 session
8. connect-mongo -- 管理 session
9. jsonwebtoken -- 管理 token
10. shortid -- 生成独一无二的 id
11. moment -- 将字符串时间变为时间对象
12. md5

# 项目

## 初始化项目

1.  搭建项目：`express -e 项目名`
2.  安装依赖: `npm i`

## 使用 lowdb 保存数据 -- 1_lowdb

1.  修改 package.json 中的启动方式: `"start": "node ./bin/www"` --> `"start": "nodemon ./1_lowdb/bin/www"`
2.  运行项目：`npm start`，浏览器输入：`http://localhost:3000/`
3.  在【routes】【index.js】设置路由
    ```js
    // 记账列表
    router.get('/account', function (req, res, next) {
      res.render('list')
    })
    // 新增记账
    router.get('/account/create', function (req, res, next) {
      res.render('create')
    })
    ```
4.  在【views】创建 list.ejs 和 create.ejs，将对应的 js 和 css 文件放到【public】中
    < list.ejs 代码

    ```html
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>我的记账本</title>
        <link href="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.css" rel="stylesheet" />
        <style>
          label {
            font-weight: normal;
          }

          .panel-body .glyphicon-remove {
            display: none;
          }

          .panel-body:hover .glyphicon-remove {
            display: inline-block;
          }
        </style>
      </head>

      <body>
        <div class="container">
          <div class="row">
            <div class="col-xs-12 col-lg-8 col-lg-offset-2">
              <h2>记账本</h2>
              <hr />
              <div class="accounts">
                <div class="panel panel-danger">
                  <div class="panel-heading">2023-04-05</div>
                  <div class="panel-body">
                    <div class="col-xs-6">抽烟只抽煊赫门，一生只爱一个人</div>
                    <div class="col-xs-2 text-center">
                      <span class="label label-warning">支出</span>
                    </div>
                    <div class="col-xs-2 text-right">25 元</div>
                    <div class="col-xs-2 text-right">
                      <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                    </div>
                  </div>
                </div>
                <div class="panel panel-success">
                  <div class="panel-heading">2023-04-15</div>
                  <div class="panel-body">
                    <div class="col-xs-6">3 月份发工资</div>
                    <div class="col-xs-2 text-center">
                      <span class="label label-success">收入</span>
                    </div>
                    <div class="col-xs-2 text-right">4396 元</div>
                    <div class="col-xs-2 text-right">
                      <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
    ```

    < create.ejs 代码

    ```html
    <!DOCTYPE html>
    <html lang="en"></html>
     <head>
         <meta charset="UTF-8" />
         <meta http-equiv="X-UA-Compatible" content="IE=edge" />
         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
         <title>添加记录</title>
         <link href="./css/bootstrap.css" rel="stylesheet" />
         <link href="./css/bootstrap-datepicker.css" rel="stylesheet">
     </head>

     <body>
         <div class="container">
             <div class="row">
                 <div class="col-xs-12 col-lg-8 col-lg-offset-2">
                     <h2>添加记录</h2>
                     <hr />
                     <form>
                         <div class="form-group">
                             <label for="item">事项</label>
                             <input type="text" class="form-control" id="item" />
                         </div>
                         <div class="form-group">
                             <label for="time">发生时间</label>
                             <input type="text" class="form-control" id="time" />
                         </div>
                         <div class="form-group">
                             <label for="type">类型</label>
                             <select class="form-control" id="type">
                                 <option value="">支出</option>
                                 <option value="">收入</option>
                             </select>
                         </div>
                         <div class="form-group">
                             <label for="account">金额</label>
                             <input type="text" class="form-control" id="account" />
                         </div>

                         <div class="form-group">
                             <label for="remarks">备注</label>
                             <textarea class="form-control" id="remarks"></textarea>
                         </div>
                         <hr>
                         <button type="submit" class="btn btn-primary btn-block">添加</button>
                     </form>
                 </div>
             </div>
         </div>
         <script src="./js/jquery.min.js"></script>
         <script src="./js/bootstrap.min.js"></script>
         <script src="./js/bootstrap-datepicker.min.js"></script>
         <script src="./js/bootstrap-datepicker.zh-CN.min.js"></script>
         <script src="./js/main.js"></script>

     </body>

     </html>
    ```

5.  将 create.ejs 中文件引入方式变为绝对路径
6.  编写新增记账接口
    < routes/index.js

    ```js
    router.post('/account', (req, res) => {
      // 获取请求体数据
      console.log(req.body)
      res.send('添加记录')
    })
    ```

    < views/create.ejs

    ```html
    <form action="/account" method="post"></form>
    ```

    不过这里在控制台中是不会打印出 req.body 的内容，因为 from 表单进行提交内容需要每个表单项都有 name 值，所以这里先补充起名字。

    ```html
    <form action="/account" method="post">
      <div class="form-group">
        <label for="item">事项</label>
        <input type="text" name="title" class="form-control" id="item" />
      </div>
      <div class="form-group">
        <label for="time">发生时间</label>
        <input type="text" name="time" class="form-control" id="time" />
      </div>
      <div class="form-group">
        <label for="type">类型</label>
        <select name="type" class="form-control" id="type">
          <option value="">支出</option>
          <option value="">收入</option>
        </select>
      </div>
      <div class="form-group">
        <label for="account">金额</label>
        <input type="text" name="account" class="form-control" id="account" />
      </div>

      <div class="form-group">
        <label for="remarks">备注</label>
        <textarea name="remarks" class="form-control" id="remarks"></textarea>
      </div>
      <hr />
      <button type="submit" class="btn btn-primary btn-block">添加</button>
    </form>
    ```

7.  使用 lowdb 来存储数据

    1. 安装 lowdb：`npm i lowdb@1.0.0`
    2. 创建 data/db.json
    3. 使用：

    ```js
    // 导入 lowdb
    const low = require('lowdb')
    const FileSync = require('lowdb/adapters/FileSync')
    const adapter = new FileSync(__dirname + '/../data/db.json')
    // 读取 db 对象
    const db = low(adapter)

    router.post('/account', (req, res) => {
      // 获取请求体数据
      console.log(req.body)
      db.get('accounts').push(req.body).write()
      res.send('添加记录')
    })
    ```

8.  自动添加 id，并将添加方式变为 unshift

    1. 安装 shortid：`npm i shortid`
    2. 使用：

    ```js
    // 导入 shortid
    const shortid = require('shortid')

    router.post('/account', (req, res) => {
      // 获取请求体数据
      // console.log(req.body)
      const id = shortid.generate()
      db.get('accounts')
        .unshift({ id, ...req.body })
        .write()
      res.send('添加记录')
    })
    ```

9.  添加提示语

    1. 新建 views/success.ejs

    ```html
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>提醒</title>
        <link href="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.css" rel="stylesheet" />
        <style>
          .h-50 {
            height: 50px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="h-50"></div>
          <div class="alert alert-success" role="alert">
            <h1>:) 添加成功</h1>
            <p>点击跳转</p>
          </div>
        </div>
      </body>
    </html>
    ```

    2. 关联 success.ejs

    ```js
    router.post('/account', (req, res) => {
      // 获取请求体数据
      // console.log(req.body)
      const id = shortid.generate()
      db.get('accounts')
        .unshift({ id, ...req.body })
        .write()
      res.render('success', { msg: '添加成功', url: '/account' })
    })
    ```

10. 获取 db.json 中的数据并渲染到 list.ejs

    < routes/index.js

    ```js
    // 记账列表
    router.get('/account', function (req, res, next) {
      const lists = db.get('accounts').value()
      res.render('list', { lists })
    })
    ```

    < vies/create.ejs 给 type 设置属性，0 为支出，1 为收入

    ```html
    <div class="form-group">
      <label for="type">类型</label>
      <select name="type" class="form-control" id="type">
        <option value="0">支出</option>
        <option value="1">收入</option>
      </select>
    </div>
    ```

    < views/list.ejs

    ```html
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-lg-8 col-lg-offset-2">
          <h2>记账本</h2>
          <hr />
          <div class="accounts">
            <% lists.forEach(list=> { %>
            <div class="panel <%= list.type==='1' ? 'panel-success' : 'panel-danger' %>">
              <div class="panel-heading"><%= list.time %></div>
              <div class="panel-body">
                <div class="col-xs-6"><%= list.title %></div>
                <div class="col-xs-2 text-center">
                  <span class="label <%= list.type === '1' ? 'label-success' : 'label-warning' %>"> <%= list.type==='1' ? '收入' : '支出' %> </span>
                </div>
                <div class="col-xs-2 text-right"><%= list.account %> 元</div>
                <div class="col-xs-2 text-right">
                  <a href="/account/<%= list.id %>">
                    <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                  </a>
                </div>
              </div>
            </div>
            <% }) %>
          </div>
        </div>
      </div>
    </div>
    ```

11. 删除记账

    1. 接口

    < routes/index.js

    ```js
    // 删除
    router.get('/account/:id', (req, res) => {
      const id = req.params.id
      db.get('accounts').remove({ id }).write()
      // 删除和添加使用不同的颜色
      res.render('success', { msg: '删除成功', url: '/account', flag: '0' })
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
    ```

    < success.ejs

    ```html
    <div class="container">
      <div class="h-50"></div>
      <div class="alert <%= flag === '1' ? 'alert-success' : 'alert-danger' %>" role="alert">
        <h1>:) <%= msg %></h1>
        <p><a href="<%= url %>">点击跳转</a></p>
      </div>
    </div>
    ```

## 使用 mongodb 保存数据 -- 2_mongodb

1. 修改 package.json 中的启动方式: `"start": "nodemon ./1_lowdb/bin/www"` --> `"start": "nodemon ./2_mongodb/bin/www"`
2. 运行项目：`npm start`，浏览器输入：`http://localhost:3000/`

3. 下载 mongoose：`npm i mongoose`

4. 连接 mongodb 并拆分：

5. 设置方便管理的公开配置
   < config/config.js

   ```js
   module.exports = {
     DBHOST: '127.0.0.1',
     DBPORT: 27017,
     DBNAME: 'accounts'
   }
   ```

6. 引入 mongoose 并连接
   < db/db.js

   ```js
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
   ```

7. 传入成功回调内容
   < bin/www

   ```js
   const db = require('../db/db')
   db(() => {
     var app = require('../app')
     var debug = require('debug')('3-node-accounts:server')
     var http = require('http')

     var port = normalizePort(process.env.PORT || '3000')
     app.set('port', port)

     var server = http.createServer(app)

     server.listen(port)
     server.on('error', onError)
     server.on('listening', onListening)

     function normalizePort(val) {
       var port = parseInt(val, 10)

       if (isNaN(port)) {
         return val
       }

       if (port >= 0) {
         return port
       }

       return false
     }
     function onError(error) {
       if (error.syscall !== 'listen') {
         throw error
       }

       var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

       switch (error.code) {
         case 'EACCES':
           console.error(bind + ' requires elevated privileges')
           process.exit(1)
           break
         case 'EADDRINUSE':
           console.error(bind + ' is already in use')
           process.exit(1)
           break
         default:
           throw error
       }
     }

     function onListening() {
       var addr = server.address()
       var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
       debug('Listening on ' + bind)
     }
   })
   ```

8. 编写 schema
   < models/accountModel.js

   ```js
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
       type: String,
       required: true
     },
     remarks: String
   })

   const accountModel = mongoose.model('accounts', accountSchema)
   module.exports = accountModel
   ```

9. 使用 mongoose 替换 lowdb

   下载 moment，将字符串时间变为时间对象
   < routes/index.js

   ```js
   var express = require('express')
   var router = express.Router()
   const moment = require('moment')
   const accountModel = require('../models/accountModel')

   // 记账列表
   router.get('/account', function (req, res, next) {
     accountModel
       .find()
       .sort({ time: -1 })
       .then(res1 => {
         res.render('list', { lists: res1, moment })
       })
       .catch(err => {
         console.log('获取失败', err)
         res.status(500).send('获取失败')
       })
   })
   // 新增记账
   router.get('/account/create', function (req, res, next) {
     res.render('create')
   })

   router.post('/account', (req, res) => {
     console.log(req.body)
     accountModel
       .create({
         ...req.body,
         time: moment(req.body.time).toDate()
       })
       .then(() => {
         res.render('success', { msg: '添加成功', url: '/account', flag: '1' })
       })
       .catch(err => {
         console.log('添加失败', err)
         res.status(500).send('添加失败')
       })
   })

   // 删除
   router.get('/account/:id', (req, res) => {
     accountModel
       .deleteOne({ _id: req.params.id })
       .then(() => {
         res.render('success', { msg: '删除成功', url: '/account', flag: '0' })
       })
       .catch(err => {
         console.log('删除失败', err)
         res.status(500).send('添加失败')
       })
   })

   module.exports = router
   ```

   < views/list.ejs

   ```js
   <!DOCTYPE html>
   <html lang="en">

   <head>
       <meta charset="UTF-8" />
       <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>我的记账本</title>
       <link href="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.css" rel="stylesheet" />
       <style>
           label {
               font-weight: normal;
           }

           .panel-body .glyphicon-remove {
               display: none;
           }

           .panel-body:hover .glyphicon-remove {
               display: inline-block
           }
       </style>
   </head>

   <body>
       <div class="container">
           <div class="row">
               <div class="col-xs-12 col-lg-8 col-lg-offset-2">
                   <div class="row">
                       <h2 class="col-xs-6">记账本</h2>
                       <h2 class="col-xs-6 text-right">
                           <a href="/account/create" class="btn btn-primary">添加账单</a>
                       </h2>
                   </div>
                   <hr />
                   <div class="accounts">
                       <% lists.forEach(list=> { %>
                           <div class="panel <%= list.type===1 ? 'panel-success' : 'panel-danger' %>">
                               <div class="panel-heading">
                                   <%= moment(list.time).format('YYYY-MM-DD') %>
                               </div>
                               <div class="panel-body">
                                   <div class="col-xs-6">
                                       <%= list.title %>
                                   </div>
                                   <div class="col-xs-2 text-center">
                                       <span class="label <%= list.type === 1 ? 'label-success' : 'label-warning' %>">
                                           <%= list.type===1 ? '收入' : '支出' %>
                                       </span>
                                   </div>
                                   <div class="col-xs-2 text-right">
                                       <%= list.account %> 元
                                   </div>
                                   <div class="col-xs-2 text-right">
                                       <a href="/account/<%= list._id %>" class="del-btn">
                                           <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                                       </a>
                                   </div>
                               </div>
                           </div>
                           <% }) %>
                   </div>
               </div>
           </div>
       </div>

       <script>
           const delBtns = document.querySelectorAll('.del-btn')
           delBtns.forEach(item => {
               item.addEventListener('click', (e) => {
                   if (confirm('是否删除')) {
                       return true
                   } else {
                       e.preventDefault()
                   }
               })
           });
       </script>
   </body>

   </html>
   ```

## 使用 web 接口 保存数据 -- 3_web

1.  修改 package.json 中的启动方式: `"start": "nodemon ./2_mongodb/bin/www"` --> `"start": "nodemon ./3_web/bin/www"`

2.  在 app.js 中引入 api/accounts.js 并使用：
    ```js
    const accountRouter = require('./routes/api/account')
    app.use('/api', accountRouter)
    ```
3.  运行项目：`npm start`，浏览器输入：`http://localhost:3000/account`

4.  编写接口：

    1. 新建 routes/api/accounts.js，将 index.js 包含到 web/index.js，accounts.js 的初始内容是 index.js
    2. 安装好 apipost 软件
    3. 编写接口:
       < routes/api/accounts.js

       ```js
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
       ```

       < apipost 的接口：https://console-docs.apipost.cn/preview/50d67ffed64d35bf/1e2a329cea3f54cc

5.  编写登录/注册

    1. 初始注册/登录页面
       < views/auth/reg.ejs

       ```html
       <!DOCTYPE html>
       <html lang="en">
         <head>
           <meta charset="UTF-8" />
           <meta http-equiv="X-UA-Compatible" content="IE=edge" />
           <meta name="viewport" content="width=device-width, initial-scale=1.0" />
           <title>注册</title>
           <link href="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.css" rel="stylesheet" />
         </head>

         <body>
           <div class="container">
             <div class="row">
               <div class="col-xs-12 col-md-8 col-md-offset-2 col-lg-4 col-lg-offset-4">
                 <h2>注册</h2>
                 <hr />
                 <form method="post" action="/reg">
                   <div class="form-group">
                     <label for="item">用户名</label>
                     <input name="username" type="text" class="form-control" id="item" />
                   </div>
                   <div class="form-group">
                     <label for="time">密码</label>
                     <input name="password" type="password" class="form-control" id="time" />
                   </div>
                   <hr />
                   <button type="submit" class="btn btn-primary btn-block">注册</button>
                 </form>
               </div>
             </div>
           </div>
         </body>
       </html>
       ```

       < views/auth/login.ejs

       ```html
       <!DOCTYPE html>
       <html lang="en"></html>

       <head>
           <meta charset="UTF-8" />
           <meta http-equiv="X-UA-Compatible" content="IE=edge" />
           <meta name="viewport" content="width=device-width, initial-scale=1.0" />
           <title>登录</title>
           <link href="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.css" rel="stylesheet" />
       </head>

       <body>
           <div class="container">
               <div class="row">
                   <div class="col-xs-12 col-md-8 col-md-offset-2 col-lg-4 col-lg-offset-4">
                       <h2>登录</h2>
                       <hr />
                       <form method="post" action="/login">
                           <div class="form-group">
                               <label for="item">用户名</label>
                               <input name="username" type="text" class="form-control" id="item" />
                           </div>
                           <div class="form-group">
                               <label for="time">密码</label>
                               <input name="password" type="password" class="form-control" id="time" />
                           </div>
                           <hr>
                           <button type="submit" class="btn btn-primary btn-block">登录</button>
                       </form>
                   </div>
               </div>
           </div>
       </body>

       </html>
       ```

    2. 在 app.js 中引入 routes/web/auth.js
       < app.js

       ```js
       const userRouter = require('./routes/web/auth')
       app.use('/', userRouter)
       ```

    3. 编写 userModel.js
       < models/userModel.js

       ```js
       const mongoose = require('mongoose')

       const userSchema = new mongoose.Schema({
         username: {
           type: String,
           required: true
         },
         password: {
           type: String,
           required: true
         }
       })

       const userModel = mongoose.model('user', userSchema)

       module.exports = userModel
       ```

    4. 展示登录/注册页面，登录、注册和退出登录操作
       安装 md5：`npm i md5`

       < routes/web/auth.js

       ```js
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
       ```

    5. 给账单列表页添加退出登录按钮
       < views/list.ejs
       ```html
       <div class="row">
         <form class="col-xs-12 text-right" action="/logout" method="post">
           <button class="btn btn-danger">退出登录</button>
         </form>
       </div>
       <div class="row">
         <h2 class="col-xs-6">记账本</h2>
         <h2 class="col-xs-6 text-right">
           <a href="/account/create" class="btn btn-primary">添加账单</a>
         </h2>
       </div>
       ```

6.  写入 session

    1. 安装 express-session：`npm i express-session`
    2. 安装 connect-mongo：`npm i connect-mongo`
    3. 设置 session 中间件

       1. 引入 session
          < app.js

          ```js
          const session = require('express-session')
          const MongoStore = require('connect-mongo')
          const { DBHOST, DBPORT, DBNAME } = require('./config/config')
          app.use(
            session({
              name: 'sid', // 设置 cookie 的 name， 默认值是：connect.sid
              secret: 'ranxin', // 参与加密的字符串（又称签名）
              saveUninitialized: false, // 是否为每次请求都设置一个 cookie 用来存储 session
              resave: true, // 是否在每次请求时重新保存 session
              store: MongoStore.create({
                mongoUrl: `mongodb://${DBHOST}:${DBPORT}/${DBNAME}` // 数据库的连接配置
              }),
              cookie: {
                httpOnly: true, // 开启前后端无法通过 JS 操作
                maxAge: 60 // 控制 sessionID 过期时间
              }
            })
          )
          ```

       2. 设置 session
          < routes/auth.js

          ```js
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
                res.render('success', { msg: '登录成功', url: '/account', flag: '1' })
              })
              .catch(() => {
                res.status(500).send('登录失败')
              })
          })
          ```

    4. 编写检测 session 的登录中间件

       < middlewares/checkLoginMiddleware.js

       ```js
       module.exports = (req, res, next) => {
         if (!req.session.username) {
           return res.redirect('/login')
         }
         next()
       }
       ```

    5. 引入检测 session 的登录中间件
       < routes/index.js

       ```js
       const express = require('express')
       const router = express.Router()
       const moment = require('moment')
       const accountModel = require('../../models/accountModel')
       const checkLoginMiddleware = require('../../middlewares/checkLoginMiddleware')
       // 首页
       router.get('/', function (req, res, next) {
         // 重定向到account页面
         res.redirect('/account')
       })

       // 记账列表
       router.get('/account', checkLoginMiddleware, function (req, res, next) {
         accountModel
           .find()
           .sort({ time: -1 })
           .then(res1 => {
             res.render('list', { lists: res1, moment })
           })
           .catch(err => {
             console.log('获取失败', err)
             res.status(500).send('获取失败')
           })
       })

       // 新增记账
       router.get('/account/create', checkLoginMiddleware, function (req, res, next) {
         res.render('create')
       })

       router.post('/account', checkLoginMiddleware, (req, res) => {
         console.log(req.body)
         accountModel
           .create({
             ...req.body,
             time: moment(req.body.time).toDate()
           })
           .then(() => {
             res.render('success', { msg: '添加成功', url: '/account', flag: '1' })
           })
           .catch(err => {
             console.log('添加失败', err)
             res.status(500).send('添加失败')
           })
       })

       // 删除
       router.get('/account/:id', checkLoginMiddleware, (req, res) => {
         accountModel
           .deleteOne({ _id: req.params.id })
           .then(() => {
             res.render('success', { msg: '删除成功', url: '/account', flag: '0' })
           })
           .catch(err => {
             console.log('删除失败', err)
             res.status(500).send('添加失败')
           })
       })

       module.exports = router
       ```

7.  配置服务端的登录验证

    1. 安装 jsonwebtoken: `npm i jsonwebtoken`
    2. 设置公共签名
       < config/config.js

       ```js
       module.exports = {
         DBHOST: '127.0.0.1',
         DBPORT: 27017,
         DBNAME: 'accounts',
         SECRET: 'ranxin'
       }
       ```

    3. 创建 token
       < routes/api/auth.js

       ```js
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
       ```

    4. 创建检验 token 的中间件
       < middlewares/checkTokenMiddleware.js

       ```js
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
       ```

    5. 引入 token 检验中间件
       < routes/api/account.js

       ```js
       var express = require('express')
       var router = express.Router()
       const moment = require('moment')
       const accountModel = require('../../models/accountModel')
       const checkTokenMiddleware = require('../../middlewares/checkTokenMiddleware')

       // 记账列表
       router.get('/account', checkTokenMiddleware, function (req, res, next) {
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
       router.post('/account', checkTokenMiddleware, (req, res) => {
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
       router.delete('/account/:id', checkTokenMiddleware, (req, res) => {
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
       router.get('/account/:id', checkTokenMiddleware, (req, res) => {
         findAccount(req.params.id, res)
       })

       router.patch('/account/:id', checkTokenMiddleware, (req, res) => {
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
       ```

8.  配置 404
    < app.js
    ```js
    app.use(function (req, res, next) {
      // next(createError(404))
      res.render('404')
    })
    ```
