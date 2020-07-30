import variables from '@/assets/styles/element-variables.scss'
import defaultSettings from '@/settings'
const { tagsView, fixedHeader, sidebarLogo, uniqueOpened, showFooter, footerTxt, caseNumber } = defaultSettings

//全局状态设置
const state = {
  theme: variables.theme,   //主题样式
  showSettings: false,    //是否显示设置
  tagsView: tagsView,   //是否显示tagsView
  fixedHeader: fixedHeader,   //是否固定头部
  sidebarLogo: sidebarLogo,   //是否显示logo
  uniqueOpened: uniqueOpened, //是否只保持一个子菜单的展开
  showFooter: showFooter,   //是否显示底部信息
  footerTxt: footerTxt,   //底部信息
  caseNumber: caseNumber  //备案号
}

//定义方法来操作state
const mutations = {   //设置全局属性
  CHANGE_SETTING: (state, {key, value}) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

//提供异步方法间接操作state
const actions = {
  changeSetting({commit}, data) {  //更改全局设置
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

