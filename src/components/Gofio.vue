<template>
  <div class="conentifo">
    <div class="conentmsg">
      <div class="blogtext" v-for="item in conentlist" v-if="$route.params.id == item._id">
        <span class="ifotype" style="display: none">{{item.type}}</span>
        <p class="ifotitle" :val="item._id">{{item.title}}</p>
        <input type="hidden" :value="item.conent" id="conent" />
        <div id="rest" class="ifodetile"></div>
        <div class="conentauthor">posted @ {{item.timer}} {{item.timers}} {{item.username}} 阅读({{item.see}}) 评论()</div>
      </div>
      <span id="typename" v-for="item in conentlist" v-if="$route.params.id == item._id" style="display: none">{{item.type}}</span>
    </div>

    <div class="comments">
      <textarea name="comment" id="comment" class="comment" v-model="commenttext"></textarea>
      <a href="javascript:;" class="commentbtn" @click="commentbtn">提交评论</a>
      <div class="commentfind">
        <div v-for="item in conentlist"  v-if="$route.params.id == item._id || uid==item._id" id="commentsbox">
          <div class="commenting" v-for="(todo,index) in item.comments" v-if="todo.text != null">
            <p>{{todo.text}}</p>
            <div class="commentifo">{{todo.time}} {{todo.timer}}   <span style="margin-left: 10px">{{todo.username}}</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default{
  name: 'Goifo',
  data(){
    return{
      commenttext:'',
      ids:'',
      text:''
    }
  },
  computed:{
    uname(){
      return this.$store.state.uname
    },
    uid(){
      return this.$store.state.uid
    },
  },
  props:['conentlist'],
  methods:{
    commentbtn(){
      const commentsbox=document.getElementById('commentsbox');
      const datas=new Date();
      const ifotitle=document.querySelector(".ifotitle")
      const text=this.commenttext;
      const time=datas.getFullYear()+'-'+parseInt(datas.getMonth()+1)+'-'+datas.getDay();
      const timer=datas.getHours()+':'+datas.getMinutes();
      const username=this.$store.state.uname;
      const id=ifotitle.getAttribute('val')
      if(text==''){
        alert("请填写评论内容!");
        return false;
      }
      if(!username){
        alert("请先登录");
        return false;
      }
      this.$http.post('/api/user/comments',{
        text:text,
        time:time,
        timer:timer,
        username:username,
        id:id
      }).then((res)=> {
        if(res.data.code==200){
          window.location.reload()
        }
      }).catch(function (err) {
        console.log(err)
      })
    }
  },

  updated(){
    const ifotype=document.querySelectorAll('.ifotype')[0] || '';
    this.$store.state.typename=ifotype.innerHTML;
    this.$mianjs.toHtml()
  },



}
</script>

<style scoped>
.blogtext{
  width: 754px;
  padding: 20px 15px;
}
  .ifotitle{
    font-size: 18px;
    color: #333;
  }
  .ifodetile{
    font-size: 14px;
    line-height: 25px;
    color: #333;
    text-indent: 10px;
    word-break: break-all;
    margin: 20px 0px;
  }
.conentauthor{
  color: #5a5757;
  font-size: 12px;
  margin: 20px 0px 0px;
}
  .conentifo{
    width: 784px;
    float: left;
    height: auto;
  }
  .conentmsg{
    width: 784px;
    min-height: 500px;
    background: #FFFFFF;
  }
  .comments{
    width: 100%;
    height: auto;
    background: #FFFFFF;
    margin-top:15px;
    padding: 20px 0px;
  }
  .comment{
    width: 600px;
    min-height: 100px;

    margin: 20px auto;
    display: block;
  }
  .commentbtn{
    display: block;
    width: 80px;
    height: 25px;
    text-align: center;
    line-height: 25px;
    color: #FFFFFF;
    font-size: 14px;
    margin: 10px auto 20px;
    background: #10caa5;
    border-radius: 4px;
  }
  .commentbtn:hover{
    color: #c24444;
    text-decoration: underline;
  }
  .commentfind{
    width: 754px;
    height: auto;
    border-top: 1px solid #CCCCCC;
    padding: 0px 15px;
  }
  .commenting{
    margin: 20px 0px;
    border-bottom: 1px dashed #CCCCCC;
    line-height: 25px;
    position: relative;
  }
  .commenting p{
    margin-bottom: 20px;
  }
  .commentifo{
    position: absolute;
    right: 5px;
    bottom: 0px;
    color: #666;
  }
</style>
