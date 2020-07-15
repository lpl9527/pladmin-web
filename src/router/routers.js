/*
    设置页面的路由*/

import Vue from 'vue'
import Router from 'vue-router' //安装： npm install --save vue-router

//路由到的页面
import Layout from '../layout/index'

//1.使用路由
Vue.use(Router)

//导出路由数组
export const constantRouterMap = [  //按照顺序加载，首先进入登录页
  { path: '/login',
    meta: { title: '登录', noCache: true },
    component: (resolve) => require(['@/views/Login'], resolve),
    hidden: true
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: (resolve) => require(['@/views/features/redirect'], resolve)
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: (resolve) => require(['@/views/Home'], resolve),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'index', affix: true, noCache: true }
      }
    ]
  }
]

//导出路由
export default new Router({
  mode: 'history',  //使用history地址模式
  scrollBehavior: () => ({ y: 0 }),
  routers: constantRouterMap
})
