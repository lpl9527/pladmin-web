/*
    数据字典详细API*/
import request from '@/utils/request'

/**
 * 根据数据字典名称获取字典信息
 * @param dictName
 */
export function get(dictName) {
  const params = {
    dictName,
    page: 0,
    size: 9999
  }
  return request({
    url: 'api/dictDetail',
    method: 'get',
    params
  })
}

/**
 * 根据字典名称获取字典
 * @param dictName
 */
export function getDictMap(dictName) {
  const params = {
    dictName,
    page: 0,
    size: 9999
  }
  return request({
    url: 'api/dictDetail/map',
    method: 'get',
    params
  })
}

/**
 * 添加字典详情
 * @param data
 */
export function add(data) {
  return request({
    url: 'api/dictDetail',
    method: 'post',
    data
  })
}

/**
 * 删除字典详情
 * @param id
 */
export function del(id) {
  return request({
    url: 'api/dictDetail/' + id,
    method: 'delete'
  })
}

/**
 * 编辑字典详情
 * @param data
 */
export function edit(data) {
  return request({
    url: 'api/dictDetail',
    method: 'put',
    data
  })
}

export default { add, edit, del }
