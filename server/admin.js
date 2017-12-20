const express=require('express');
const router=express.Router();
const db=require('./db')

var responsDate;
router.use(function (req,res,next) {
  responsDate={
    code:0,
    message:''
  }
  next()
})

router.get("/",function (req,res,next) {
  db.classfaction.find().then(function (rs) {
    if (req.cookies.get('userInfo')) {
      res.render('admin',{
        userInfo:req.userInfo,
        typelists:rs
      })
      return;
    }else{
      res.render('login',{
        userInfo:req.userInfo
      })
      return;
    }
  })
})

//添加分类
router.post('/admin/classfaction/typetitle',function (req,res,next) {
  var name=req.body.name;
  if(name==""){
    responsDate.code=1;
    responsDate.message="不能为空";
    res.json(responsDate);
    return;
  }
  db.classfaction.findOne({
    name:name
  }).then(function (rs) {
    if(rs){
      responsDate.code=3;
      responsDate.message="次分类已经存在";
      res.json(responsDate);
      return;
    }else{
      var classfaction=new db.classfaction({
        name:name
      })
      classfaction.save()
    }
  }).then(function (newType) {
    responsDate.code=200;
    responsDate.message="添加成功";
    res.json(responsDate);
    return;
  })
})

//删除分类
router.post("/admin/delete",function (req,res,next) {
  var _id=req.body._id;
  db.classfaction.remove({
    _id:_id
  }).then(function () {
    responsDate.code=200;
    responsDate.message="删除成功";
    res.json(responsDate)
    return;
  })
})

//修改分类
router.post("/admin/change",function (req,res,next) {
  var _id=req.body._id;
  var name=req.body.name;
  db.classfaction.findOne({
    _id:_id
  }).then(function (rs) {
    if(rs){
      responsDate.code=200;
      responsDate.message="修改成功";
      res.json(responsDate);
      return db.classfaction.update({
        _id: _id},
        {name: name
      });
      return;
    }else{
      responsDate.code=1;
      responsDate.message="删除成功";
      res.json(responsDate)
      return;
    }

  })
})
//登陆
router.post('/admin/user/login',function (req,res,next) {
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
      responsDate.code=2;
      responsDate.message="用户名或密码错误";
      res.json(responData)
      return;
    }
    responsDate.code=200;
    responsDate.message="登陆成功";

    responsDate.userInfo={
      id:userInfo._id,
      username:userInfo.username
    }
    req.cookies.set('userInfo',JSON.stringify({
      _id:userInfo._id,
      username:userInfo.username
    }))
    res.json(responsDate);
    return;
  })
})
//退出登录
router.post('/admin/user/goout',function (req,res,next) {
  req.cookies.set('userInfo', null);
  responsDate.message="退出成功";
  res.json(responsDate);
  return;
})

//内容部分
//内容列表
router.get('/conent',function (req,res,next) {
  /*
    * 从数据库中读取所有的用户数据
    *
    * limit(Number) : 限制获取的数据条数
    *
    * skip(2) : 忽略数据的条数
    *
    * 每页显示2条
    * 1 : 1-2 skip:0 -> (当前页-1) * limit
    * 2 : 3-4 skip:2
    * */
    var limit=8;
    var pages=0;   //共几页
    var page=Number(req.query.page || 1);    //当前是第几页
  db.conent.count().then(function (count) {

    pages=Math.ceil(count/limit);
    page=Math.min(page,pages);    //取值不能超过pages
    page=Math.max(page,1);  //取值不能小于1
    var skip=limit*(page-1);
    db.conent.find().limit(limit).skip(skip).then(function (rs) {
      res.render('conent',{
        userInfo:req.userInfo,
        conentlist:rs,
        pages:pages,
        limit:limit,
        count:count,
        page:page
      })
    })
  })
})


//内容添加
router.get('/conent_add',function (req,res,next) {
  db.classfaction.find().then(function (rs) {
    res.render('conent_add.html',{
      userInfo:req.userInfo,
      typelist:rs
    })
  })
})
//内容删除
router.post('/admin/conent/delete',function (req,res,next) {
  var _id=req.body._id;
  db.conent.findOne({
    _id:_id
  }).then(function (rs) {
    if(rs){
      db.conent.remove({
        _id:_id
      }).then(function () {
        responsDate.code=200;
        responsDate.message="删除成功";
        res.json(responsDate);
        return;
      })
    }
  })
})

//提交内容
router.post('/admin/conent_add',function (req,res,next) {
  if(req.body.type=="" || req.body.title=="" || req.body.description=="" || req.body.conent==""){
      responsDate.message= '内容分类不能为空';
      responsDate.code=1;
      res.json(responsDate)
    return;
  }
  const conents=new db.conent({
    type:req.body.type,
    title:req.body.title,
    description:req.body.description,
    conent:req.body.conent,
    time:req.body.time,
    timer:req.body.timer,
    timers:req.body.timers,
  })
  return conents.save().then(function (rs) {
    responsDate.message= '提交成功';
    responsDate.code=200;
    res.json(responsDate)
  });
})

//编辑内容跳转
router.get('/conent/conent_edit',function (req,res,next) {
  var id=req.query.id || '';
  db.conent.findOne({
    _id:id
  }).then(function (rs) {
    if(rs){
      db.classfaction.find().then(function (ts) {
        res.render('conent_edit',{
          editconent:rs,
          typelist:ts
        })
      })
    }
  })
})
//编辑内容保存
router.post('/admin/conent_edit',function (req,res,next) {
  var id=req.body.id;
  db.conent.findOne({
    _id:id
  }).then(function (rs) {
    if(rs){

      responsDate.code=200;
      responsDate.message="修改成功";
      res.json(responsDate);
      return db.conent.update({
        _id:id
      },{
        type:req.body.type,
        title:req.body.title,
        description:req.body.description,
        conent:req.body.conent,
        time:req.body.time,
        timer:req.body.timer,
        timers:req.body.timers,
      })
    }else{
      responsDate.code=1;
      responsDate.message="不存在改内容";
      res.json(responsDate);
      return;
    }
  })
})
module.exports=router;
