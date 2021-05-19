import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export const store = new Vuex.Store({
    // 设置属性
    state: {
      user: window.sessionStorage.getItem("soid"),
    },
  
    // 获取属性的状态
    // getters: {
    //   //获取登录状态
    //   requireLogin: state => state.requireLogin,
    // },
  
    // 设置属性状态
    mutations: {
      SET_USER:(state,data)=>{
        state.user = data;
        window.sessionStorage.setItem("user",data)
      }
    },
  
    // // 应用mutations
    // actions: {
    //   //获取登录状态
    //   userLogin({commit}, flag) {
    //     commit("userStatus", flag)
    //   },
    // }
  })