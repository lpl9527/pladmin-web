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
