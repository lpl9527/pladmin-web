/*
    部署历史*/
import request from '@/utils/request'

/**
 * 删除部署历史
 * @param ids
 */
export function del(ids) {
  return request({
    url: 'api/deployHistory',
    method: 'delete',
    data: ids
  })
}

/**
 * 版本回退
 * @param data 选中行
 */
export function reducte(data) {
  return request({
    url: 'api/deploy/serverReduction',
    method: 'post',
    data
  })
}
