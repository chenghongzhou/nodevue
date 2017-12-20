import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    typename:'',
    uname:'',
    uid:''
  }
})
export default store
