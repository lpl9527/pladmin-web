/*
    系统菜单相关api方法*/

import request from "../../utils/request";

/**
 * 请求系统菜单
 * @returns {AxiosPromise}
 */
export function buildMenus() {
  return request({
    url: 'api/menus/build',
    method: 'get'
  })
}

/**
 * 根据id获取菜单树数据
 * @param pid
 * @returns {AxiosPromise}
 */
export function getMenusTree(pid) {
  return request({
    url: 'api/menus/lazy?pid=' + pid,
    method: 'get'
  })
}

/**
 * 获取所有的菜单
 * @param params
 * @returns {AxiosPromise}
 */
export function getMenus(params) {
  return request({
    url: 'api/menus',
    method: 'get',
    params
  })
}

/**
 * 根据id获取同级及父级菜单
 * @param ids
 * @returns {AxiosPromise}
 */
export function getMenuSuperior(ids) {
  const data = ids.length || ids.length === 0 ? ids : Array.of(ids)
  return request({
    url: 'api/menus/superior',
    method: 'post',
    data
  })
}

/**
 * 新增菜单
 * @param data
 * @returns {AxiosPromise}
 */
export function add(data) {
  return request({
    url: 'api/menus',
    method: 'post',
    data
  })
}

/**
 * 批量删除菜单
 * @param ids
 * @returns {AxiosPromise}
 */
export function del(ids) {
  return request({
    url: 'api/menus',
    method: 'delete',
    data: ids
  })
}

/**
 * 编辑菜单
 * @param data
 * @returns {AxiosPromise}
 */
export function edit(data) {
  return request({
    url: 'api/menus',
    method: 'put',
    data
  })
}

export default { add, edit, del, getMenusTree, getMenuSuperior, getMenus }
