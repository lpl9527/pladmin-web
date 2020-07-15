import Vue from 'vue'
import Vuex from 'vuex'

import getters from "./getters";

//使用Vuex
Vue.use(Vuex)

//正则匹配获取./modules下的所有module
const modulesFiles = require.context('./modules', true, /\.js$/)
//正则匹配加载当前目录下所有的module
const modules = modulesFiles.keys().reduce((modules, modulePath) => {   //这里使用了reduce高阶函数，初始值为{}

  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})
//实例化Vuex
const store = new Vuex.Store({
  modules: modules,
  getters: {

    roles: state => state.user.roles
  }
})
//导出
export default store
