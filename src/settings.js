/*
    这里是一些全局配置*/
module.exports = {

  /**
   *  网站标题
   */
  title:  'ADMIN-SYSTEM',
  /**
   * 是否显示tagsView
   */
  tagsView: true,
  /**
   *  是否固定头部
   */
  fixedHeader: true,
  /**
   *  记住密码状态下token在Cookie中存储的天数，默认1天
   */
  tokenCookieExpires: 1,
  /**
   *  记住密码状态下密码在Cookie中存储的天数，默认1天
   */
  passCookieExpires:  1,
  /**
   *  是否只保持一个子菜单的展开
   */
  uniqueOpened:   true,
  /**
   *  Cookie中存储的token的key
   */
  tokenKey: 'ADMIN-SYSTEM-TOKEN',
  /**
   *  请求超时时间（单位毫秒），默认2分钟
   */
  timeout:    120000,
  /**
   *  是否显示logo
   */
  sidebarLog: true,
  /**
   *  是否显示底部信息
   */
  showFooter: true,
  /**
   *  底部信息，支持html语法
   */
  footerText: '© 2020 lpl <a href="http://www.apache.org/licenses/LICENSE-2.0" target="_blank">Apache License 2.0</a>',
  /**
   * 备案号
   */
  caseNumber: '皖lpl备123456号'

}
