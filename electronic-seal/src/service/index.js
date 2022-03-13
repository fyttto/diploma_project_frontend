import axios from 'axios';
import { ElMessage } from 'element-plus';

const baseURL = '/api';

const service = axios.create({
  baseURL,
  timeout: 10000,
});

service.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';

const httpCode = {
  // 常见的http状态码出现的提示信息
  400: '请求参数错误',
  401: '权限不足, 请重新登录',
  403: '服务器拒绝本次访问',
  404: '请求资源未找到',
  500: '内部服务器错误',
  501: '服务器不支持该请求中使用的方法',
  502: '网关错误',
  504: '网关超时',
};

// 前置请求拦截器的设置
service.interceptors.request.use(
  (request) => request,
  (error) => {
    Promise.reject(error);
  },
);

service.interceptors.response.use(
  (response) => {
    if (response.status !== 200) {
      ElMessage({
        message: response.data,
        type: 'error',
        duration: 5 * 1000,
      });
    }
    return Promise.resolve(response);
  },
  (error) => {
    if (error) {
      const tips = error.status in httpCode ? httpCode[error] : error.message;
      ElMessage({
        message: tips,
        type: 'error',
        duration: 5 * 1000,
      });
    }
    return Promise.reject(error);
  },
);

export default service;
