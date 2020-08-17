/*
    在线用户监控相关api*/
import request from '@/utils/request'

/**
 * 强退在线用户
 * @param keys
 */
export function del(keys) {
  return request({
    url: 'auth/online',
    method: 'delete',
    data: keys
  })
}
