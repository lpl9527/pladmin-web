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
