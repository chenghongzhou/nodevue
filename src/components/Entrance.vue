<template>
  <div class="entrancebox">
    <div class="userifo">
      <!--<div class="login_success" v-if="isAdmin == true">-->
        <!--管理员,<span style="color: #10caa5">{{loginSuccess}}</span>-->
        <!--<a href="/views/user_index.html" class="goint">点击进入后台管理</a>-->
        <!--<a href="javascript:;" class="goout" @click="gooutbtn">退出</a>-->
      <!--</div>-->
      <div class="ettop">公告</div>
      <div class="zym">学习，总结，分享，进步</div>
      <div class="login_success" v-if="loginSuccess !== ''">
        <p>昵称:<span style="color: #10caa5">{{loginSuccess}}</span></p>
        <p>园龄:<span style="color: #10caa5">2年</span></p>
        <p>粉丝：<span style="color: #10caa5">1545454</span></p>
        <a href="javascript:;" class="goout" @click="gooutbtn">退出</a>
      </div>
      <div class="loginpart" v-if="loginSuccess == ''">
        <p style="text-align: center;font-size:14px;color:#333">登陆</p>
        <div style="margin: 10px 20px;">
          <label style="width: 48px;display: inline-block">用户名</label>
          <input type="text" name="username" v-model="username" />
        </div>
        <div style="margin: 10px 20px;text-align: justify;">
          <label style="width: 48px;display: inline-block">密&#12288;码</label>
          <input type="password" name="password" v-model="password" />
        </div>
        <a href="javascript:;" class="login loginbtn" @click="loginbtn">登陆</a>
        <div style="text-align: center">没有账户，点击<a href="javascript:;" class="resign" @click="login">注册</a></div>
      </div>
      <div class="resiginpart" style="display: none">
        <p style="text-align: center;font-size:14px;color:#333">注册</p>
        <div style="margin: 10px 20px;">
          <label style="width: 48px;display: inline-block">用户名</label>
          <input type="text" name="username" id="resusername"/>
        </div>
        <div style="margin: 10px 20px;text-align: justify;">
          <label style="width: 48px;display: inline-block">密&nbsp;  码</label>
          <input type="password" name="password" id="respassword"/>
        </div>
        <div style="margin: 10px 20px;text-align: justify;">
          <label style="width: 48px;display: inline-block">确认密码</label>
          <input type="password" name="password" id="repassword"/>
        </div>
        <a href="javascript:;" class="login resignbtn" @click="resiginbtn">注册</a>
        <div style="text-align: center">有账户，点击<a href="javascript:;" class="relogin" @click="resige">登陆</a></div>
      </div>
    </div>
    <!--<News></News>-->
  </div>
</template>

<script>
import News from './News'
export default{
  name: 'Entrance',
  data () {
    return {
      username:"",
      password:'',
      islogins:true,
      myusername:'sdf',
      loginSuccess:'',
      isAdmin:'',

    }
  },
  methods: {
    login () {
      const loginpart = document.querySelector('.loginpart')
      const resiginpart = document.querySelector('.resiginpart')
      loginpart.style.display = 'none'
      resiginpart.style.display = 'block'
    },
    resige () {
      const loginpart = document.querySelector('.loginpart')
      const resiginpart = document.querySelector('.resiginpart')
      loginpart.style.display = 'block'
      resiginpart.style.display = 'none'
    },
    resiginbtn(){
      const loginpart = document.querySelector('.loginpart')
      const resiginpart = document.querySelector('.resiginpart')
      const username = document.querySelector('#resusername')
      const password = document.querySelector('#respassword')
      const repassword = document.querySelector('#repassword')
      this.$http.post('/api/user/register',{
        username:username.value,
        password:password.value,
        repassword:repassword.value
      }).then(function (res) {
        if(res.data.code==200){
          setTimeout(function () {
            loginpart.style.display = 'block';
            resiginpart.style.display = 'none';
          },1000)
        }else{
          alert(res.data.message)
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    loginbtn(){
      const loginpart = document.querySelector('.loginpart');
      this.$http.post('/api/user/login',{
        username:this.username,
        password:this.password
      }).then((res)=> {
        if(res.data.code==200){
          window.location.reload();
        }else{
          alert(res.data.message)
        }
      }).catch(function (error) {
        alert(error)
      })
    },
    gooutbtn(){
      this.$http.post('/api/user/goout').then(function (res) {
        window.location.reload()
      }).then(function (err) {
        console.log(err)
      })
    }
  },
  components: {
    News
  },
  created(){
    this.$http.post('/api/user/sus').then((res)=> {
      if(res.data.code==200){
        console.log(res.data.message);
        this.loginSuccess=res.data.message.username;
        this.isAdmin=res.data.message.isAdmin;
        this.$store.state.uname=res.data.message.username;
      }
    }).catch(function (err) {
      console.log(err)
    })
  }
}
</script>

<style scoped>
.entrancebox{
  float: right;
  width: 280px;
}
.userifo{
  background:#ffffff;
  width: 100%;
  height: auto;
  /*padding-top: 20px;*/
  padding-bottom: 20px;
  border-bottom: 1px solid #cccccc;
}
.zym{
  width: 100%;
  text-indent: 15px;
  font-size: 14px;
  color: #666;
  padding: 10px 0px;
  line-height: 16px;
  border-bottom: 1px solid #CCCCCC;
}
.login{
  display: block;
  width: 50px;
  height: 25px;
  margin: 20px auto;
  color: #ffffff;
  background: #10caa5;
  border-radius:5px;
  line-height: 25px;
  text-align: center;
}
.ettop{
  width: 100%;
  height: 40px;
  background: #10caa5;
  line-height: 40px;
  font-size: 16px;
  text-indent: 15px;
  color: #FFFFFF;
}
.relogin{
  color: #10caa5;
}
.resign{
  color: #10caa5;
}
  .userifo input{
    height: 20px;
    line-height: 20px;
    padding-left: 5px;
    font-size: 12px;
  }
  .login_success p{
    text-align: left;
    text-indent: 15px;
    line-height: 30px;

  }
</style>
