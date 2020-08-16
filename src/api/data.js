/*
    对请求进一步封装，用于获取表格数据或下载*/
import request from "../utils/request";

//qs 是一个增加了一些安全性的查询字符串解析和序列化字符串的库。qs.parse()是将URL解析成对象的形式。qs.stringify()是将对象序列化成URL的形式，以&进行拼接。
import qs from 'qs'   //安装： npm install --save qs

/**
 * 初始化表格数据
 * @param url 请求url
 * @param params  参数
 * @returns {AxiosPromise}
 */
export function initData(url, params) {
  return request({
    url: url + '?' + qs.stringify(params, {indices: false}),
    method: 'get'
  })
}

/**
 * 下载请求
 * @param url 请求url
 * @param params  参数
 * @returns {*}
 */
export function download(url, params) {
  return request({
    url: url + '?' + qs.stringify(params, {indices: false}),
    method: 'get',
    responseType: 'blob'
  })
}

