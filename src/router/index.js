import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Gofio from '@/components/Gofio'
import Type from '@/components/Type'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/detial/:id',
      name: 'detial',
      component: Gofio
    },
    {
      path:'/type/:id',
      name:'type',
      component:Type
    }
  ]
})
