/*
    部门相关请求API*/
import request from "../../utils/request";

/**
 * 根据条件获取部门数据
 * @param params
 * @returns {AxiosPromise}
 */
export function getDepts(params) {
  return request({
    url: 'api/dept',
    method: 'get',
    params
  })
}

/**
 * 根据部门id获取同级及上级部门树形数据
 * @param ids
 * @returns {AxiosPromise}
 */
export function getDeptSuperior(ids) {
  //获取部门id数组
  const data = ids.length || ids.length === 0 ? ids : Array.of(ids)
  return request({
    url: 'api/dept/superior',
    method: 'post',
    data
  })
}

/**
 * 添加部门
 * @param data
 * @returns {AxiosPromise}
 */
export function add(data) {
  return request({
    url: 'api/dept',
    method: 'post',
    data
  })
}

/**
 * 删除部门
 * @param ids
 * @returns {AxiosPromise}
 */
export function del(ids) {
  return request({
    url: 'api/dept',
    method: 'delete',
    data: ids
  })
}

/**
 * 编辑部门
 * @param data
 * @returns {AxiosPromise}
 */
export function edit(data) {
  return request({
    url: 'api/dept',
    method: 'put',
    data
  })
}

export default { add, del, edit, getDepts, getDeptSuperior }
