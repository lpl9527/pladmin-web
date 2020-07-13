/*
    认证相关工具类*/

import Cookies from 'js' //安装： npm install --save js-cookie

import Config from '@settings'

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
  if (rememberMe){
    return Cookies.set(tokenKey, token, {expires: Config.tokenCookieExpires})
  }
}

export function removeToken() {
  return Cookies.remove(tokenKey)
}
