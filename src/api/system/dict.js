import request from '@/utils/request'

/**
 * 获取所有字典
 */
export function getDicts() {
  return request({
    url: 'api/dict/all',
    method: 'get'
  })
}

/**
 * 添加字典
 * @param data
 */
export function add(data) {
  return request({
    url: 'api/dict',
    method: 'post',
    data
  })
}

/**
 * 删除字典
 * @param ids
 */
export function del(ids) {
  return request({
    url: 'api/dict/',
    method: 'delete',
    data: ids
  })
}

/**
 * 编辑字典
 * @param data
 */
export function edit(data) {
  return request({
    url: 'api/dict',
    method: 'put',
    data
  })
}

export default { add, edit, del }
