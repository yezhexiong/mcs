//路由定义

import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Index/Home'
import Login from '@/views/Index/Login'
import Consultation from '@/views/Consultation/Index'

Vue.use(VueRouter)

export default new VueRouter({
  // mode:'history',
  routes: [{
      path: '/',
      name: '主界面',
      redirect:'Consultation',
      component: Home,children: [{
          path: 'Consultation',
          name: '会诊管理',
          component: Consultation
        }
      ]
    },{
      path: '/login',
      name: '登录页面',
      component: Login
    }
  ]
})
