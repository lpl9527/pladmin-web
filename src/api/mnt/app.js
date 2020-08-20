/*
    应用管理api*/
import request from '@/utils/request'

/**
 * 添加应用
 * @param data
 */
export function add(data) {
  return request({
    url: 'api/app',
    method: 'post',
    data
  })
}

/**
 * 删除应用
 * @param ids
 */
export function del(ids) {
  return request({
    url: 'api/app',
    method: 'delete',
    data: ids
  })
}

/**
 * 编辑应用
 * @param data
 */
export function edit(data) {
  return request({
    url: 'api/app',
    method: 'put',
    data
  })
}

export default { add, edit, del }
