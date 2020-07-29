/*
    路由权限控制*/

//导入插件
import NProgress from 'nprogress'   //地址栏下面的进度条   安装： npm install --save nprogress
import 'nprogress/nprogress.css'    //进度条样式

//导入定义的配置
import router from './routers'    //导入路由
import Config from '@/settings'   //导入全局配置
import {getToken} from "../utils/auth"; //导入获取token方法
import store from "../store";   //导入vuex
import {buildMenus} from "../api/system/menu";
import { filterAsyncRouter } from '@/store/modules/permission'


const whiteList = ['/login']    //不重定向到登录页的请求路径

//跳转到所有路由前的控制守卫，to：即将要进入的目标路由对象，from：当前导肮正要离开的路由对象，next：回调钩子函数
router.beforeEach((to, from, next) => {

  if (to.meta.title) {   //如果跳转的页面存在标题
    document.title = to.meta.title + ' - ' + Config.title
  }
  NProgress.start()
  if(getToken()) {
    console.log('=================')

    //已登录，且要跳转的页面是登录页
    if (to.path === '/login'){
      next({path: '/'})   //进入主页
      NProgress.done()
    }else {
      if (store.getters.roles.length === 0) { //如果还未拉取到用户信息
        store.dispatch('GetInfo').then(res => {   //调用store的action异步拉取用户信息
          //动态路由，拉取菜单
          loadMenus(next, to)
        }).catch(err => {
          store.dispatch('LogOut').then(() => {
            location.reload()
          })
        })
      }else if (store.getters.loadMenus) {
        // 通过转发到user.js的action并提交修改加载菜单请求为false，防止死循环
        store.dispatch('updateLoadMenus').then(res => {})
        //加载菜单
        loadMenus(next, to)
      } else {
        next()
      }
    }
  } else {    //没有token时
    console.log('++++++++++++++++')
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      //console.log('from.path -------- ' + from.path)
      //console.log('to.path +++++++++++' + to.path)
      next()    //如果已经重定向到登录页就放行
    } else {
      console.log(`++++++++++++++++++from redirect=${from.fullPath}`)
      console.log(`++++++++++++++++++to redirect=${to.fullPath}`)
      next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

//从后台获取用户下的菜单
export const loadMenus = (next, to) => {
  buildMenus().then(res => {
    const asyncRouter = filterAsyncRouter(res)
    asyncRouter.push({
      path: '*',
      redirect: '/404',
      hidden: true
    })
    store.dispatch('GenerateRoutes', asyncRouter).then(() => {
      router.addRoutes(asyncRouter) // 动态添加可访问路由表
      next({ ...to, replace: true })
    })
  })
}

router.afterEach(() => {
  NProgress.done()  //完成进度条
})
