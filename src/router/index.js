import Vue from 'vue'
import VueRouter from "vue-router"
import Router from 'vue-router'
import Home from '@/pages/home/home'
import Login from '@/pages/home/login'
import Register from '@/pages/home/register'
import Class from '@/pages/class/class'
import DoExperiment from '@/pages/doExperiment/doExperiment'
import EDetail from '@/pages/doExperiment/eDetail'
Vue.use(Router)
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)
export default new Router({
  mode:'hash',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta:{
        title:'首页',
        requireLogin:false
      }
    },
    {
      path: '/login',
      name: 'login', // 登录页面
      component: Login,
      meta:{
        title:'登录',
        requireLogin:false
      }

    },
    {
      path: '/register',
      name: 'register', // 注册页面
      component: Register,
      meta:{
        title:'注册',
        requireLogin:false
      }
    },
    {
      path: '/class',
      name: 'class', // 班级管理页面
      component: Class,
      meta:{
        title:'班级管理',
        requireLogin:false
      }
    },
    {
      path: '/doExperiment',
      name: 'doExperiment', // 实验中心页面
      component: DoExperiment,
      meta:{
        title:'实验中心',
        requireLogin:false
      }
    },
    {
      path: '/eDetail',
      name: 'eDetail', // 实验中心---做实验页面
      component: EDetail,
      meta:{
        title:'实验中心',
        requireLogin:false
      }
    }
  ]
})
