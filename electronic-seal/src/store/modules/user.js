/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import { getToken, setToken } from '@/utils/auth';
import { login, getUserInfo } from '@/utils/request';
import { ElMessage } from 'element-plus';
import router from '@/router';

const state = {
  info: {},
  role: [],
  otherInfo: {},
  token: getToken(),
};

const mutations = {
  SET_INFO: (state, data) => {
    state.info = data;
  },
  SET_TOKEN: (state, data) => {
    state.token = data;
    window.sessionStorage.setItem('token', data);
  },
  SET_OTHERINFO: (state, userInfo) => {
    state.otherInfo = userInfo;
  },

  SET_ROLE: (state, role) => {
    state.role.push(role);
  },
};

const actions = {
  login({ commit }, loginProps) {
    return new Promise((resolve, reject) => {
      login(loginProps)
        .then((res) => {
          if (res.status === 200) {
            if (res.data.success) {
              ElMessage({
                type: 'success',
                message: '登陆成功',
              });
              const { data } = res.data ? res.data : {};
              commit('SET_TOKEN', data.token);
              commit('SET_ROLE', data.user.role);
              commit('SET_OTHERINFO', data.user);
              window.localStorage.setItem('userInfo', JSON.stringify(data.user));
              window.localStorage.setItem('role', JSON.stringify(data.user.role));

              setToken(res.data.token);
              router.push({ path: '/' }); // 登录成功之后重定向到首页
            } else {
              ElMessage({
                type: 'error',
                message: res.data.message,
              });
            }
          } else {
            ElMessage({
              type: 'error',
              message: '请求异常请稍后重试',
            });
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // get user info
  getInfo({ state }, userId) {
    return new Promise((resolve, reject) => {
      getUserInfo(userId)
        .then((response) => {
          if (response.status === 200 && response.data.code === 200) {
            const { data } = response;
            console.log(state);
            resolve(data);
          } else {
            ElMessage.error('请求错误');
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit }) {
    commit('SET_TOKEN', '');
    commit('SET_ROLES', []);
    commit('SET_OTHERINFO', []);
    window.localStorage.removeItem('userInfo');
    window.localStorage.removeItem('role');
    router.push({ path: '/login' }); // 登录成功之后重定向到首页
  },

  // remove token
  // resetToken({ commit }) {
  //   return new Promise((resolve) => {
  //     commit('SET_TOKEN', '');
  //     commit('SET_ROLES', []);
  //     removeToken();
  //     resolve();
  //   });
  // },
  // dynamically modify permissions
  // async changeRoles({ commit, dispatch }, role) {
  //   const token = `${role}-token`;
  //   commit('SET_TOKEN', token);
  //   setToken(token);
  //   const { roles } = await dispatch('getInfo');
  //   resetRouter();
  //   // generate accessible routes map based on roles
  //   const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true });
  //   // dynamically add accessible routes
  //   router.addRoutes(accessRoutes);
  //   // reset visited views and cached views
  //   dispatch('tagsView/delAllViews', null, { root: true });
  // },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
