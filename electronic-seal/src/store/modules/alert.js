/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import { getAlertHandling, getAlertType, getAlertList } from '@/utils/request';
import { formatDateTimeForHMSS } from '@/utils/tools';
import { ElMessage } from 'element-plus';

const map = new Map();

const state = {
  alertList: [],
  alertType: [],
  alertLine: [],
  alertTypeText: {
    0: '系统误报',
    1: '疑似非法生产',
    2: '运输设备正常维修',
    3: '非运输车出入',
    4: '非生产人员经过',
    5: '摄像头遮挡、挪动角度识别信息',
    6: '调度室空岗',
    7: '摄像头离线',
    8: '运输设备异常启动',
    9: '人员入井',
  },
  resolvedType: {
    0: '已处理',
    1: '处理中',
    2: '未处理',
  },
};

const mutations = {
  Set_ALERTLIST: (state, alertList) => {
    // eslint-disable-next-line no-param-reassign
    state.alertList = alertList;
  },

  Set_ALERTTYPE: (state, alertType) => {
    // eslint-disable-next-line no-param-reassign
    state.alertType.push(alertType);
  },
  Set_ALERTLINE: (state, alertLine) => {
    // eslint-disable-next-line no-param-reassign
    state.alertLine.push(alertLine);
  },
};
const actions = {
  // 折线图报警情况
  getAlertLine({ commit }, userId) {
    return new Promise((resolve, reject) => {
      getAlertHandling(userId)
        .then((response) => {
          if (response.status === 200 && response.data.code === 200 && response.data.success) {
            Object.keys(response.data.data.statistics).forEach((i) => {
              const tempData = {
                key: i,
                value: response.data.data.statistics[i],
              };
              if (!map.has(tempData.key)) {
                map.set(tempData.key, tempData.value);
                commit('Set_ALERTLINE', tempData);
              }
            });
            resolve(response.data.data.statistics);
          } else {
            ElMessage.error('请求错误');
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // 报警类型分布图
  getAlertType({ state, commit }, userId) {
    return new Promise((resolve, reject) => {
      getAlertType(userId)
        .then((response) => {
          if (response.status === 200 && response.data.code === 200 && response.data.success) {
            Object.keys(response.data.data.map).forEach((i) => {
              const tempData = {
                name: state.alertTypeText[i],
                value: response.data.data.map[i],
              };
              commit('Set_ALERTTYPE', tempData);
            });
            resolve(response.data.data.map);
          } else {
            ElMessage.error('请求错误');
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getAlertList({ commit }, parma) {
    return new Promise((resolve, reject) => {
      getAlertList(parma)
        .then((response) => {
          if (response.status === 200 && response.data.code === 200 && response.data.success) {
            const data = response.data.data.items || [];
            data.forEach((value) => {
              value.time = formatDateTimeForHMSS(value.time);
            });
            commit('Set_ALERTLIST', response.data.data.items);
            resolve(response.data.data.items);
          } else {
            ElMessage.error('请求错误');
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
