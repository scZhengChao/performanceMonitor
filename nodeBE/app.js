// import 等语法要用到 babel 支持
require('babel-register')
const express = require('express');
const cors = require('cors')
const path = require('path')
let history = require('connect-history-api-fallback')

// 全局的util 无需 手写引入
let util = require('./util')
Object.entries(util).forEach(item=>global[item[0]] = item[1])

const app = express();

// 解决history模式
app.use(history());
app.use(morgan4acc)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  origin: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  credentials: true
}))

// 按sdk vue 分 , 或者 按表分, 按增删改查 分 ...
app.use('/jssdk',require('./routes/webjssdk'))
app.use('/',require('./routes/index'))

// 静态文件托管
app.use('/static', express.static('public'))
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).json({
    message:'找不到此接口'
  })
});

// error handler
app.use(function(err, req, res, next) {
  console.log(err,'err middleware 捕捉')
  if(err){
    let {message,stack} = err
    res.status(500).json({
      message,
      stack
    })
  }else{
      next()
  }
});

let server = app.listen(3000,()=>{
  console.log('server running at http://localhost:3000  '+ process.env.NODE_ENV)
  console.log(`工作进程 ${process.pid} 已启动`);
});

process.on('uncaughtException', function (err) {  
    // 所以以下, 只是保证你优雅的推出 , 重启还是的pm2 来
    logger.error(`监听到的未捕获到的异常:message:${err.message}----${err.stack}`) 
})







