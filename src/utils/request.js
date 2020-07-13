/*
    网络请求封装*/

import Cookies from 'js-cookie'
import axios from 'axios'   //安装： npm install --save axios
import {Notification} from "element-ui";  //安装： npm install --save element-ui

import Config from '@/settings'
import {getToken} from "./auth";

//创建axios实例
const request = axios.create({    //设置基础选项
  baseURL: process.env.ENV === 'production' ? process.env.VUE_APP_BASE_API :'/',  //api的baseUrl
  timeout: Config.timeout    //设置超时时间
})

//请求拦截器，config为请求参数对象
request.interceptors.request.use(config => {
  if(getToken()) {
    config.headers['Authorization'] = getToken()  //让每个请求携带自定的的token
  }
  config.headers['Content-Type'] = 'application/json'
  return config
}, error => {
  Notification.error({
    title: '请求异常！'
  })
  return Promise.reject(error)
})

//响应拦截器，response为响应结果
request.interceptors.response.use(response => {
  const code = response.status  //获取响应状态码
  if(code < 200 || code > 300) {
    Notification.error({
      title: response.message
    })
  }
})
