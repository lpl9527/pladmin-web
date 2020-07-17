import Vue from 'vue'
import App from './App.vue'
import router from './router/routers'
import store from "./store";

import Cookies from 'js-cookie'   //使用Cookie工具，安装： npm install --save js-cookie

import 'normalize.css/normalize.css'    //使用normalize.css解决跨浏览器的样式一致性，安装： npm install --save-dev normalize.css

import Element from 'element-ui'    //使用element-ui库

import mavonEditor from 'mavon-editor'  //基于vue的markdown编辑器，安装： npm install --save mavon-editor
import 'mavon-editor/dist/css/index.css'

import './assets/styles/index.scss'   //引入全局css样式

import VueHighlightJS from 'vue-highlightjs'  //使用代码高亮， 安装：npm install --save highlight.js
import 'highlight.js/styles/atom-one-dark.css'

import './assets/icons' //引入所有的图标，需要安装svg： npm install --save-dev svg-sprite-loader

import 'echarts-gl'   //引入echarts-gl三维散点图，安装： npm install --save echarts

import './router'   //导入router权限控制

//还需要安装的插件：
// sass解析scss样式文件：npm install --save-dev node-sass sass-loader  。若出现报错：更新数据源重试：npm config set sass_binary_site=https://npm.taobao.org/mirrors/node-sass


Vue.config.productionTip = false

//使用插件
Vue.use(VueHighlightJS)
Vue.use(mavonEditor)
Vue.use(Element, {
  size: Cookies.get('size') || 'small'  //设置element ui默认大小
})

new Vue({
  router,
  store,
  render: h => h(App)  //h表示createElement()方法
}).$mount('#app')
