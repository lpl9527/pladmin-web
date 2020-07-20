/*
    网络请求封装*/

import Cookies from 'js-cookie'
import axios from 'axios'   //安装： npm install --save axios
import {Notification} from "element-ui";  //安装： npm install --save element-ui
import store from "../store";

import Config from '@/settings'
import {getToken} from "./auth";
import router from '@/router/routers'

//创建axios实例
const request = axios.create({    //设置基础选项
  //baseURL: process.env.ENV === 'production' ? process.env.VUE_APP_BASE_API :'/',  //api的baseUrl
  baseURL: 'http://localhost:8000',
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
    return Promise.reject('发生错误！')
  }else {
    return response.data
  }
}, error=> {
  let code = 0
  try {
    code = error.response.data.status
  }catch (e) {
    if (error.toString().indexOf('Error: timeout') !== -1){
      Notification.error({
        title: '网络请求超时！',
        duration: 5000
      })
      return Promise.reject(error)
    }
  }
  if (code) {
    if (code === 401) {
      /*store.dispatch('LogOut').then(() => {
        //用户登录界面提示
        Cookies.set('point', 401)
        location.reload()
      })*/
    }else if(code === 403) {
      router.push({path: '/401'})
    }else {
      const errorMsg = error.response.data.message
      if(errorMsg !== undefined) {
        Notification.error({
          title: errorMsg,
          duration: 5000
        })
      }
    }
  }else {
    Notification.error({
      title: '接口请求失败！',
      duration: 5000
    })
  }
  return Promise.reject(error)
})

export default request
