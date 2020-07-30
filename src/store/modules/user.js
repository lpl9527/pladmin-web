/*
    这里存放用户相关的的全局信息、方法*/
import {getToken, setToken, removeToken} from "../../utils/auth";
import {login, getInfo, logout} from "../../api/login";

//用户全局信息
const user = {
  state: {    //用户状态信息驱动数据源
    token: getToken(),
    user: {},
    roles: [],
    loadMenus: false  //第一次加载菜单时用到
  },
  mutations: {    //更改store中state值的唯一方法就是提交mutation。每个mutation都有一个字符串的事件类型(type)和一个回调函数(handler)。这个回调函数就是我们实际进行状态更改的地方，并且它会接受state作为第一个参数。
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_LOAD_MENUS: (state, loadMenus) => {
      state.loadMenus = loadMenus
    }
  },
  actions: {  //Action提交的是mutation，而不是直接变更state状态。Action可以包含任意异步操作，用来进行异步网络请求。Action函数接受一个与store实例具有相同方法和属性的context对象，因此可以调用context.commit提交一个mutation，或者通过context.state和context.getters 来获取state和getters。
    //用户登录
    Login({commit}, userInfo) {
      const rememberMe = userInfo.rememberMe
      return new Promise((resolve, reject) => {
        login(userInfo.username, userInfo.password, userInfo.code, userInfo.uuid).then(res => {
          //登录成功设置token
          setToken(res.token, rememberMe)
          console.log('3333333333333')
          commit('SET_TOKEN', res.token)    //登录成功，将token放入state
          setUserInfo(res.user, commit)
          // 第一次加载菜单时用到， 具体见 src 目录下的 permission.js
          commit('SET_LOAD_MENUS', true)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    //获取用户信息
    GetInfo({commit}) {
      return new Promise((resolve, reject) => {
        getInfo().then(res => {
          setUserInfo(res, commit)
          resolve(res)    //成功拿到用户信息
        }).catch(err => {
          reject(err)
        })
      })
    },
    //登出
    LogOut({commit}) {
      return new Promise((resolve, reject) => {
        logout().then(res => {
          logOut(commit)
          resolve()
        }).catch(err => {
          logOut(commit)
          reject(err)
        })
      })
    },
    //关闭加载菜单请求
    updateLoadMenus({commit}) {
      return new Promise((resolve, reject) => {
        commit('SET_LOAD_MENUS', false)
      })
    }

  }
}

//登出时清空state中token和角色信息，清除token
export const logOut = (commit) => {
  commit('SET_TOKEN', '')
  commit('SET_ROLES', [])
  removeToken()
}

//设置用户和角色到state
export const setUserInfo = (res, commit) => {
  //如果没有任何权限，则赋予一个默认的权限，避免请求死循环
  if (res.roles.length === 0) {
    commit('SET_ROLES', ['ROLE_SYSTEM_DEFAULT'])
  }else {
    commit('SET_ROLES', res.roles)
  }
  commit('SET_USER', res.user)
}

export default user
