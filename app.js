// 引入编写好的api
var api = require('./server/api');
const admin = require('./server/admin');
// 引入文件模块
const fs = require('fs');
// 引入处理路径的模块
const path = require('path');
// 引入处理post数据的模块
const bodyParser = require('body-parser')
// 引入Express
const express = require('express');
const swig=require('swig')

const showdown=require('showdown')
//引入cookies
const Cookies=require('cookies');
const User= require('./models/User')
const app = express();
const db = require('./server/db');
app.use(bodyParser.json());
// 访问静态资源文件 这里是访问所有dist目录下的静态资源文件
// app.use(express.static(path.resolve(__dirname, '../src/assets')))
app.use( '/public', express.static( __dirname + '/public') );

// const converter=new showdown.converter();
// converter.makeHTML('#hello markdown')
//配置应用模板
//定义当前应用所使用的模板引擎
//第一个参数：模板引擎的名称，同时也是模板文件的后缀，第二个参数表示用于解析处理模板内容的方法
app.engine('html', swig.renderFile);
//设置模板文件存放的目录，第一个参数必须是views，第二个参数是目录
app.set('views', './views');
//注册所使用的模板引擎，第一个参数必须是 view engine，第二个参数和app.engine这个方法中定义的模板引擎的名称（第一个参数）是一致的
app.set('view engine', 'html');
//在开发过程中，需要取消模板缓存
swig.setDefaults({cache: false});
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.resolve(__dirname, '../dist')))


//设置cooies
app.use(function (req,res,next) {
  req.cookies = new Cookies(req, res)
  req.userInfo = {};
  if (req.cookies.get('userInfo')) {
    try {
      req.userInfo = JSON.parse(req.cookies.get('userInfo'));
      //获取当前登录用户的类型，是否是管理员
      User.findById(req.userInfo._id).then(function(userInfo) {
        req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
        next();
      })
    }catch(e){
      next();
    }

  } else {
    next();
  }
})

//后台管理页
// app.get("/views",function (req,res,next) {
//   if (req.cookies.get('userInfo')) {
//     //var html = fs.readFileSync(path.resolve(__dirname, './views/user_index.html'), 'utf-8')
//     res.render('admin.html',{
//       userInfo:req.userInfo
//     })
//     return;
//   }else{
//     var html = fs.readFileSync(path.resolve(__dirname, './views/login.html'), 'utf-8')
//     res.send(html);
//     return;
//   }
// })

//划分不同的模块
app.use('/views',require('./server/admin'))  //后台
app.use('/',require('./server/api'))   //前台
// 前台页
// app.get('/', function(req, res,next) {
//   const html = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8')
//   res.send(html)
// })


// 监听8088端口
app.listen(8088);
console.log('success listen…………');
