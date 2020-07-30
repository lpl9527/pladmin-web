/*
    认证相关工具类*/

import Cookies from 'js-cookie' //安装： npm install --save js-cookie

import Config from '@/settings'

const tokenKey = Config.tokenKey

//导出Cookie相关方法
/**
 * 获取token
 * @returns {*}
 */
export function getToken() {
  return Cookies.get(tokenKey)
}

/**
 * 设置token
 * @param token
 * @param rememberMe
 * @returns {*}
 */
export function setToken(token, rememberMe) {
  if (rememberMe){  //当选择了记住我时就设置token的过期时间
    return Cookies.set(tokenKey, token, {expires: Config.tokenCookieExpires})
  }else {
    return Cookies.set(tokenKey, token)
  }
}

export function removeToken() {
  return Cookies.remove(tokenKey)
}
