/*
    连接相关api*/
import request from '@/utils/request'

/**
 * 测试数据库连接
 * @param data
 */
export function testDbConnect(data) {
  return request({
    url: 'api/database/testConnect',
    method: 'post',
    data
  })
}

/**
 * 测试服务器连接
 * @param data
 */
export function testServerConnect(data) {
  return request({
    url: 'api/serverDeploy/testConnect',
    method: 'post',
    data
  })
}

