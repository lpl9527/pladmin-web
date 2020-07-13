import Vue from 'vue'
import App from './App.vue'

import router from './router/routers'
import store from "./store";

Vue.config.productionTip = false

import './router'   //导入router权限控制

new Vue({
  render: h => h(App),  //h表示createElement()方法
  router,
  store
}).$mount('#app')
