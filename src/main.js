// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import Carousel3d from 'vue-carousel-3d'
import '@/assets/reset.css'
import '@/assets/font.js'
import 'bootstrap'
import $ from 'jquery'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import api from "./interface/index"
import { store } from './store'
import common from './assets/common'
require('./mock/mock')
Vue.prototype.$api = api.commonUrl
Vue.use(Carousel3d)
Vue.use(Vuex)
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$axios = axios;
Vue.prototype.common=common;
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title == undefined?'默认标题':to.meta.title
  // if (to.meta.requireAuth) {
  //     let token = Cookies.get('access_token');
  //     let anonymous = Cookies.get('user_name');
  //     if (token) { 
          
  //             next({
  //                 path: '/login',
  //                 query: {
  //                     redirect: to.fullPath
  //                 } 
  //             })
        
  //     }
  // }
  //用户想进入需要登录的页面，则定向回登录界面
    if(to.meta.requireLogin){
      let getUser = window.sessionStorage.getItem("user")
      if(getUser===null||getUser===""){
        next({
          path: '/login',
        })
        
        common.myMessage({
          message: '请先登录！',
          type: 'info',
        });
      }
     
    //用户进入无需登录的界面，则跳转继续
    }else{
      next()
    }

  

  next();
})
router.afterEach(route=>{
  window.scroll(0,0)
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})

