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

/**
 * 编辑角色菜单
 * @param data
 */
export function editMenu(data) {
  return request({
    url: 'api/roles/menu',
    method: 'put',
    data
  })
}

/**
 * 根据id查询角色
 * @param id
 */
export function get(id) {
  return request({
    url: 'api/roles/' + id,
    method: 'get'
  })
}

/**
 * 添加角色
 * @param data
 */
export function add(data) {
  return request({
    url: 'api/roles',
    method: 'post',
    data
  })
}

/**
 * 根据id列表删除
 * @param ids
 */
export function del(ids) {
  return request({
    url: 'api/roles',
    method: 'delete',
    data: ids
  })
}

/**
 * 编辑角色
 * @param data
 */
export function edit(data) {
  return request({
    url: 'api/roles',
    method: 'put',
    data
  })
}

export default { add, edit, del, get, editMenu, getLevel }
