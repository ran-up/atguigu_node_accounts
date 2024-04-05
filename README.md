# 简介

学习 node 的一个非常简易的练习项目 -- 记账本

# 技术

1. node.js
2. ejs
3. express
4. lowdb
5. mongodb
6. mongoose

# 项目

## 使用 lowdb 保存数据

下面所说的 views 变为 views1，routes 变为 routes1

1.  搭建项目：`express -e 项目名`
2.  安装依赖: `npm i`
3.  修改 package.json 中的启动方式: `"start": "node ./bin/www"` --> `"start": "nodemon ./bin/www"`
4.  运行项目：`npm start`，浏览器输入：`http://localhost:3000/`
5.  在【routes】【index.js】设置路由
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
6.  在【views】创建 list.ejs 和 create.ejs，将对应的 js 和 css 文件放到【public】中
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

7.  将 create.ejs 中文件引入方式变为绝对路径
8.  编写新增记账接口
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

9.  使用 lowdb 来存储数据

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

10. 自动添加 id，并将添加方式变为 unshift

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

11. 添加提示语

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

12. 获取 db.json 中的数据并渲染到 list.ejs

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

13. 删除记账

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

    ```

    ```

## 使用 mongodb 保存数据