/*
    设置一些路由常量*/

import Vue from 'vue'
import Router from 'vue-router'   //安装： npm install --save vue-router
import Layout from '../layout/index'

Vue.use(Router)   //使用路由

//定义一些路由常量
export const constantRouterMap = [
  {
    path: '/login',   //进入登录页
    meta: { title: '登录', noCache: true },
    component: (resolve) => require(['@/views/login'], resolve),
    hidden: true
  },
  {
    path: '/user',   //进入个人中心页面
    meta: { title: '个人中心', noCache: true },
    component: Layout,
    hidden: true,
    redirect: 'noredirect',   //不能点击跳转
    children: [
      {
        path: 'center',
        component: (resolve) => require(['@/views/system/user/center'], resolve),
        name: '个人中心',
        meta: {title: '个人中心', icon: 'user'}
      }
    ]
  },
  {       //转到首页
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: (resolve) => require(['@/views/home'], resolve),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'index', affix: true, noCache: true }
      }
    ]
  },
  {     //重定向到动态路由地址
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [   //其它路由地址都是作为Layout的子菜单的形式进行展示的
      {
        path: '/redirect/:path*',
        component: (resolve) => require(['@/views/features/redirect'], resolve)
      }
    ]
  }

]

//导出路由
export default new Router({
  mode: 'history',    //使用history地址模式
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
