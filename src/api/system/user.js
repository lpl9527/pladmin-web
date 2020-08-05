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
