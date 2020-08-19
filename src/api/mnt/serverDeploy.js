/*
    服务器管理相关api*/
import request from '@/utils/request'

/**
 * 添加服务器
 * @param data
 */
export function add(data) {
  return request({
    url: 'api/serverDeploy',
    method: 'post',
    data
  })
}

/**
 * 删除服务器
 * @param ids
 */
export function del(ids) {
  return request({
    url: 'api/serverDeploy',
    method: 'delete',
    data: ids
  })
}

/**
 * 编辑服务器
 * @param data
 */
export function edit(data) {
  return request({
    url: 'api/serverDeploy',
    method: 'put',
    data
  })
}

export default { add, edit, del }
