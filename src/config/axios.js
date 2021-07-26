/**
 * @file axios 全局配置
 * @desc 帮助文档：http://www.axios-js.com/zh-cn/docs/
 */

import axios from 'axios';

// let axios = axios.create();

// ajax 请求全局配置
axios.defaults.timeout = 5000;
axios.defaults.baseURL = '/';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    response.data.errno =  typeof response.data.code === 'undefined' ? response.data.errno : response.data.code;
    return response.data;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

export default axios;