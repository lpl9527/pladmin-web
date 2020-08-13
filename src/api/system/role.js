/*
    角色相关api*/
import request from '@/utils/request'

/**
 * 获取所有的角色
 */
export function getAll() {
  return request({
    url: 'api/roles/all',
    method: 'get'
  })
}

/**
 * 获取当前用户权限级别
 */
export function getLevel() {
  return request({
    url: 'api/roles/level',
    method: 'get'
  })
}
