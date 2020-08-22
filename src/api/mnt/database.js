/*
    数据库相关api*/
import request from '@/utils/request'

/**
 * 添加数据库
 * @param data
 */
export function add(data) {
  return request({
    url: 'api/database',
    method: 'post',
    data
  })
}

/**
 * 删除数据库
 * @param ids
 */
export function del(ids) {
  return request({
    url: 'api/database',
    method: 'delete',
    data: ids
  })
}

/**
 * 编辑数据库
 * @param data
 */
export function edit(data) {
  return request({
    url: 'api/database',
    method: 'put',
    data
  })
}

export default { add, edit, del }
