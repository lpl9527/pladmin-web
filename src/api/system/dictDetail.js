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

