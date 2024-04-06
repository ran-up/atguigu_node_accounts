const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const { DBHOST, DBPORT, DBNAME } = require('./config/config')

const indexRouter = require('./routes/web/index')
const userRouter = require('./routes/web/auth')
const accountRouter = require('./routes/api/account')
const authRouter = require('./routes/api/auth')

const app = express()
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
      maxAge: 60 * 60 * 24 * 7 // 控制 sessionID 过期时间
    }
  })
)

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../public')))

app.use('/', indexRouter)
app.use('/', userRouter)
app.use('/api', accountRouter)
app.use('/api', authRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  // next(createError(404))
  res.render('404')
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
