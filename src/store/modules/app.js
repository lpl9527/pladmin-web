/*
    应用全局配置*/

import Cookies from 'js-cookie'

const state = {
  sidebar: {  //左边侧边栏是否隐藏
    opened: Cookies.get('sidebarStatus') ? !! + Cookies.get('sidebarStatus') : true,
    withoutAnimation: false   //记录当前sidebar的展开状态
  },
  device: 'desktop',  //默认桌面版
  size: Cookies.get('size') || 'small'  //获取全局布局大小
}

//定义一些操作state方法
const mutations = {
  TOGGLE_SIDEBAR: state => {   //切换侧边栏
    state.sidebar.opened = !state.sidebar.opened  //切换
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {   //如果侧边栏是展开的，设置到Cookie中
      Cookies.set('sidebarStatus', 1)
    }else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {   //关闭侧边栏
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {   //切换设备
    state.device = device
  },
  SET_SIZE: (state, size) => {    //设置大小
    state.size = size
  }
}

//定义一些异步方法通过提交mutation来修改state的值
const actions = {
  toggleSideBar({commit}) { //切换工具栏
    commit('TOGGLE_SIDEBAR')
  },
  closeSidebar({commit}, {withoutAnimation}) {  //关闭工具栏
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({commit}, device) {  //切换设备
    commit('TOGGLE_DEVICE', device)
  },
  setSize({commit}, size) {   //设置大小
    commit('SET_SIZE', size)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
