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
 * 根据部门id数组获取部门数据
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
