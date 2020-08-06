import request from '@/utils/request'

/**
 * 重置密码发送验证码到新邮箱
 * @param data 新邮箱
 */
export function sendEmailCode(data) {
  return request({
    url: 'api/code/sendEmailCode?email=' + data,
    method: 'post'
  })
}
