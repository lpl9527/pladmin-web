/*
    日志相关api*/
import request from '@/utils/request'

/**
 * 删除所有日志信息
 */
export function delAllInfo() {
  return request({
    url: 'api/logs/del/info',
    method: 'delete'
  })
}

/**
 * 删除所有错误日志
 */
export function delAllError() {
  return request({
    url: 'api/logs/del/error',
    method: 'delete'
  })
}

/**
 * 根据id获取错误日志详细
 * @param id
 */
export function getErrDetail(id) {
  return request({
    url: 'api/logs/error/' + id,
    method: 'get'
  })
}
