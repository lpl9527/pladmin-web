//用户相关api

import request from "../../utils/request";  //导入封装的axios请求
import { encrypt } from "../../utils/rsaEncrypt"; //rsa公钥加密方法

/**
 * 修改用户密码
 * @param user
 * @returns {AxiosPromise}
 */
export function updatePass(user) {
  //获取加密后的新、旧密码数据
  const data = {
    oldPass: encrypt(user.oldPass),
    newPass: encrypt(user.newPass)
  }
  return request({
    url: 'api/users/updatePass/',
    method: 'post',
    data: data
  })
}

/**
 * 更新邮箱
 * @param form
 * @returns {AxiosPromise}
 */
export function updateEmail(form) {
  //获取请求数据
  const  data = {
    password: encrypt(form.pass),
    email: form.email
  }
  return request({
    url: 'api/users/updateEmail/' + form.code,
    method: 'post',
    data
  })
}

/**
 * 个人中心编辑用户信息
 * @param data
 * @returns {AxiosPromise}
 */
export function editUser(data) {
  return request({
    url: 'api/users/center',
    method: 'put',
    data
  })
}
//--------------------用户管理增删改查方法，函数名称不能随意更改，与crud封装的方法保持一致

/**
 * 新增用户
 * @param data
 * @returns {AxiosPromise}
 */
export function add(data) {
  return request({
    url: 'api/users',
    method: 'post',
    data
  })
}

/**
 * 根据id批量删除用户
 * @param ids
 * @returns {AxiosPromise}
 */
export function del(ids) {
  return request({
    url: 'api/users',
    method: 'delete',
    data: ids
  })
}

/**
 * 编辑用户
 * @param data
 * @returns {AxiosPromise}
 */
export function edit(data) {
  return request({
    url: 'api/users',
    method: 'put',
    data
  })
}

export default {add, edit, del}
