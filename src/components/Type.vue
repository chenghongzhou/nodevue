<template>
  <div class="conentpart">
    <div class="blogifobox" v-for="item in conentlist" v-if="item.type == $route.params.id">
        <a href="javascript:;" class="times">{{item.time}}</a><a href="javascript:;" class="titleifo">{{item.title}}</a>
        <div class="conentmain">摘要：{{item.description}}</div>
      <div @click="see(item)">
          <router-link :to="{name:'detial',params: { type:item.type,title: item.title ,conent:item.conent,id:item._id}}" class="reading">阅读全文>></router-link>
      </div>
        <div class="conentauthor">posted @ {{item.timer}} {{item.timers}} {{item.username}} 阅读({{item.see}}) 评论()</div>
    </div>

    <div v-for="item in conentlist" v-if="item.type == typename">
      <span class="ifotype" style="display: none">{{item.type}}</span>
    </div>
    <span id="typename" style="display: none">{{$route.params.id}}</span>
  </div>
  </div>
</template>

<script>
  export default{
    name: 'Type',
    props:['conentlist'],
    data () {
      return {
          typeName:''
      }
    },
    computed:{
      typename(){
        return this.$store.state.typename
      }
    },
    methods:{
      see(todo){
        this.$http.post('/api/user/see',{
          id:todo._id
        }).then((rs)=> {
          this.$store.state.uid=todo._id;
        }).catch(function (err) {
          console.log(err)
        })
      }
    },
    mounted:function () {
      const typename=document.getElementById("typename") || "";
      this.typeName=typename.innerHTML;
      this.$store.state.typename=typename.innerHTML;
    },
    updated(){
      const typename=document.getElementById("typename") || "";
      this.typeName=typename.innerHTML;
      this.$store.state.typename=typename.innerHTML;

      this.$mianjs.toHtml()
    },
  }
</script>

<style scoped>
  .blogifobox{
    width: 752px;
    height: auto;
    padding: 20px 16px;
    border-bottom: 1px solid #cccccc;
    position: relative;
  }
  .times{
    display: inline-block;
    background: #10caa5;
    width: 100px;
    height: 25px;
    line-height: 26px;
    text-align: center;
    color: #ffffff;
    word-break: break-all;
  }
  .times:hover{
    background: #ff5e52;
    text-decoration: underline;
  }
  .titleifo{
    display: inline-block;
    font-size: 18px;
    color: #555;
    margin-left: 16px;
    word-break: break-all;
    position: relative;
    top:3px;
  }
  .titleifo:hover{
    color:#10caa5;
  }
  .conentmain{
    width: 100%;
    font-size: 14px;
    color: #333;
    word-break:break-all;
    margin: 20px 0px;
    line-height: 20px;
  }
  .conentauthor{
    color: #5a5757;
    font-size: 12px;
    margin: 20px 0px 0px;
  }
  .bjhs{
    color: #666;
  }
  .reading{
    width: 100px;
    height: 30px;
    color: #ffffff;
    background: #10caa5;
    text-align: center;
    line-height:30px;
    display: block;
    font-size: 14px;
    position: absolute;
    bottom: 20px;
    right: 20px;
    -webkit-transition: ease 0.5s;
    -moz-transition: ease 0.5s;
    -ms-transition: ease 0.5s;
    -o-transition: ease 0.5s;
    transition: ease 0.5s;
    border-radius: 4px;
  }
  .reading:hover{
    background: #EE6FA0;
    transform:rotate(360deg);
    -webkit-transform:rotate(360deg);
    -moz-transform:rotate(360deg);
  }
</style>
