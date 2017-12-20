// Schema、Model、Entity或者Documents的关系请牢记，Schema生成Model，Model创造Entity，Model和Entity都可对数据库操作造成影响，但Model比Entity更具操作性。
const mongoose = require('mongoose')
// 连接数据库 如果不自己创建 默认test数据库会自动生成
mongoose.connect('mongodb://localhost:27020/vueblogs',{useMongoClient: true},function (err) {
  if(err){
    console.log("数据库连接失败")
  }else{
    console.log("数据库连接成功")
  }
})

// 为这次连接绑定事件
// const db = mongoose.connection
// db.once('error', () => console.log('Mongo connection error'))
// db.once('openUri', () => console.log('Mongo connection successed'))

//用户得表结构
const usersSchema = mongoose.Schema({
  username : String,
  password : String
})

//分类得表结构
const classfactionSchema = mongoose.Schema({
  name:String
})

//内容得表结构
const conentSchema = mongoose.Schema({
  conent:String,
  title:String,
  description:String,
  type:String,
  time:String,
  timer:String,
  timers:String,
  username:{
    type:String,
    default:'一醉千年'
  },
  see:{
    type:Number,
    default:0
  },
  comments:{
    type:Array,
  },
})
// 定义模型Model
const Models = {
  users : mongoose.model('users', usersSchema),
  classfaction:mongoose.model('classfaction',classfactionSchema),
  conent:mongoose.model("conent",conentSchema)
}

module.exports = Models
