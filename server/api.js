const express = require('express')
const db = require('./db');
const router = express.Router();


// 统一返回格式
var responData;
router.use(function (req,res,next) {
  console.log(45)
  responData={
    code:200,
    message:''
  }
  next()
})
router.get('/', function(req, res,next) {
  // const html = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8')
  // res.send(html)
  res.render('./dist/index',{
    userInfo:req.userInfo
  })
})
router.post('/api/user/register',function (req,res,next) {
  var username=req.body.username;
  var password=req.body.password;
  var repassword=req.body.repassword;
  if(username==""){
    responData.code=1;
    responData.message="用户名不能为空";
    res.json(responData);
    return;
  }
  if(password==""){
    responData.code=2;
    responData.message="密码不能为空";
    res.json(responData);
    return;
  }
  if(password != repassword){
    responData.code=3;
    responData.message="两次密码不一致";
    res.json(responData);
    return;
  }
  //查询数据库是否存在
  db.users.findOne({
    username:username
  }).then(function(userIfo){
    if(userIfo){
      //表示数据库有改数据
      responData.code=4;
      responData.message="用户名已被注册";
      res.json(responData);
      return;
    }
    //保存到数据库
    var users=new db.users({
      username:username,
      password:password
    });
    users.save()
  }).then(function (newUserIfo) {
    responData.code=200;
    responData.message="注册成功";
    res.json(responData)
    return;
  })

});


//登陆
router.post('/api/user/login',function (req,res,next) {
  var username=req.body.username;
  var password=req.body.password;
  if(username=="" || password==""){
    responData.code=1;
    responData.message="用户名或密码不能为空";
    res.json(responData);
    return;
  }
  db.users.findOne({
    username:username,
    password:password
  }).then(function (userInfo) {
    if(!userInfo){
      responData.code=2;
      responData.message="用户名或密码错误";
      res.json(responData)
      return;
    }
    responData.code=200;
    responData.message="登陆成功";

    responData.userInfo={
      id:userInfo._id,
      username:userInfo.username
    }
    req.cookies.set('userInfo',JSON.stringify({
      _id:userInfo._id,
      username:userInfo.username
    }))
    res.json(responData);
    return;
  })
})
//加个接口 由于没有用swig模板，暂时先这样传参，
router.post('/api/user/sus',function (req,res,next) {
  if(req.cookies.get('userInfo')){
    var users=JSON.parse(req.cookies.get('userInfo'))
    db.users.findById(users._id).then(function (userInfo) {
      users.isAdmin=Boolean(userInfo.isAdmin);
      responData.code=200;
      responData.message=users;
      res.json(responData);
    })
  }else{
    responData.code=1;
    responData.message="";
    res.json(responData);
  }
  return;
})
//添加接口，接收分类
router.post('/api/user/typelist',function (req,res,next) {
  db.classfaction.find().then(function (rs) {
    responData.message=rs;
    res.json(responData);
    return;
  })
})

//退出登录
router.post('/api/user/goout',function (req,res,next) {
  req.cookies.set('userInfo', null);
  responData.message="退出成功";
  res.json(responData);
  return;
})


router.post('/api/typetitle/dff',function (req,res,next) {
  var name=req.body.name;
  console.log(name)
})

//获取博客内容
router.post('/api/conentlist',function (req,res,next) {
  db.conent.find().then(function (rs) {

    responData.message=rs;
    res.json(responData);
    return;
  })
})

//浏览接口
router.post('/api/user/see',function (req,res,next) {
  var id=req.body.id;
  db.conent.findOne({
    _id:id
  }).then(function (rs) {
    if(rs){
      rs.see++;
      rs.save();
      responData.code=200;
      res.json(responData)
      return;
    }
  })
})

//提交评论
router.post('/api/user/comments',function (req,res,next) {
    const id=req.body.id;

    db.conent.findOne({
      _id:id
    }).then(function (rs) {
      rs.comments.push({
        time:req.body.time,
        timer:req.body.timer,
        username:req.body.username,
        text:req.body.text
      });
      rs.save();
      responData.code=200;
      // responData.data=rs;
      responData.message='评论成功';
      res.json(responData)

    })
})
module.exports = router;
