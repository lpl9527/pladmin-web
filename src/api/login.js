/*
    用户登录相关请求*/

import request from "../utils/request";

/**
 * 用户登录请求
 * @param username
 * @param password
 * @param code
 * @param uuid
 * @returns {AxiosPromise}
 */
export function login(username, password, code, uuid) {
  return request({
    url:  'auth/login',
    method: 'post',
    data: {
      username,
      password,
      code,
      uuid
    }
  })
}

/**
 * 获取用户信息
 * @returns {AxiosPromise}
 */
export function getInfo() {
  return request({
    url: 'auth/info',
    method: 'get'
  })
}

/**
 * 获取验证码图片
 * @returns {AxiosPromise}
 */
export function getCodeImg() {
  return request({
    url: 'auth/code',
    method: 'get'
  })
}

/**
 * 登出
 * @returns {AxiosPromise}
 */
export function logout() {
  return request({
    url: 'auth/logout',
    method: 'delete'
  })
}
