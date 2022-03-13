/**
 *
 * 对get、post请求函数进行封装
 *
 */

import service from './index';

export function get(url, params, config = {}) {
  return new Promise((resolve, reject) => {
    service({
      method: 'get',
      url,
      params,
      ...config,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function post(url, data, config = {}) {
  return new Promise((resolve, reject) => {
    service({
      method: 'post',
      url,
      data,
      ...config,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
