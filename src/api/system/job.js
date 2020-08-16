import request from '@/utils/request'

/**
 * 获取所有的岗位数据
 */
export function getAllJob() {
  const params = {
    page: 0,
    size: 9999,
    enabled: true
  }
  return request({
    url: 'api/job',
    method: 'get',
    params
  })
}

/**
 * 添加岗位
 * @param data
 */
export function add(data) {
  return request({
    url: 'api/job',
    method: 'post',
    data
  })
}

/**
 * 删除岗位
 * @param ids
 */
export function del(ids) {
  return request({
    url: 'api/job',
    method: 'delete',
    data: ids
  })
}

/**
 * 编辑岗位
 * @param data
 */
export function edit(data) {
  return request({
    url: 'api/job',
    method: 'put',
    data
  })
}

export default { add, edit, del }
