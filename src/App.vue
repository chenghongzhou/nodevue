<template>
  <div id="app">
    <Top></Top>
    <div class="conents">
      <router-view :conentlist=conentlist></router-view>
      <Entrance></Entrance>
    </div>
  </div>
</template>

<script>
import './assets/css/mian.css'
import Top from './components/Top.vue'
import Entrance from './components/Entrance.vue'
export default {
  name: 'app',
  data(){
    return{
      loginSuccess:'',
      isAdmin:'',
      conentlist:""
    }
  },
  components: {
    Top,
    Entrance
  },
  created(){
    this.$http.post('/api/conentlist').then((rs)=>{
      this.conentlist=rs.data.message;

    }).catch(function (error) {
      alert(error)
    })
  },
  updated(){
    this.$mianjs.toHtml()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
  .conents{
    width: 1080px;
    height: auto;
    margin: 26px auto;
    overflow: hidden;
  }
</style>
