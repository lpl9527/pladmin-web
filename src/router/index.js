/*
    路由权限控制*/

//导入插件
import NProgress from 'nprogress'   //地址栏下面的进度条   安装： npm install --save nprogress

//导入定义的配置
import router from './routers'    //导入路由
import Config from '@/settings'   //导入全局配置
import {getToken} from "../utils/auth"; //导入获取token方法
import store from "../store";   //导入vuex


const whileList = ['/login']    //不重定向到登录页的请求路径

//跳转到所有路由前的控制守卫，to：即将要进入的目标路由对象，from：当前导肮正要离开的路由对象，next：回调钩子函数
router.beforeEach((to, from, next) => {

  if (to.meta.title) {   //如果跳转的页面存在标题
    document.title = to.meta.title + ' - ' + Config.title
  }
  NProgress.start()
  if(getToken()) {
    //已登录，且要跳转的页面是登录页
    if (to.path === '/login'){
      next({path: '/'})   //进入主页
      NProgress.done()
    }else {
      if (store.getters.roles.length === 0) {
        store.dispatch()
      }
    }
  }
})


