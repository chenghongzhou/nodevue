<template>
  <div class="toppary">
    <!--<img src="../assets/img/bgimg.jpg" class="topbaner"/>-->
    <div class="headtitle">
      <router-link :to="{name:'Index'}" class="logo"></router-link>
      <router-link :to="{name:'type',params:{id:item.name,type:item.name}}" v-for="(item,index) in typelist" class="titlelist" :class="{checkeds:typename==item.name}">
        {{item.name}}
      </router-link>
    </div>
  </div>
</template>

<script>
export default{
  name: 'Top',
  data () {
    return {
      typelist:'',
      ischecked:false
    }
  },
  computed:{
    typename(){
      return this.$store.state.typename;
    }
  },
  created(){
    this.$http.post('/api/user/typelist').then((rs)=>{
      this.typelist=rs.data.message;
    }).catch(function (err) {
      console.log(err)
    })
  },
  methods:{
    mpcheck(todo){
      this.ischecked=true;
    }
  },
}
</script>

<style scoped>
  .toppary{
    width: 100%;
    background: #3c3c3c;
  }
.topbaner{
  width: 100%;
  height: 206px;
  display: block;
}
.mpchecked{
  display: block;
  width:100%;
  height: 100%;
}
.logo{
  display: inline-block;
  width: 126px;
  height: 40px;
  background: url("../assets/img/logo.png") center no-repeat;
  background-size: contain;
  margin-top:10px;
  margin-right: 30px;
}
.headtitle{
  width: 1080px;
  height: 60px;
  margin: 0 auto;
  line-height:60px;
  font-size: 16px;
  display: flex;
  display: -webkit-flex;
  display: -moz-flex;
}
.titlelist{
  display: inline-block;
  width:85px;
  color: #ffffff;
  text-align: center;
}
  .checkeds{
    color: #10caa5;
    border-bottom: 3px solid #10caa5;
  }
</style>
