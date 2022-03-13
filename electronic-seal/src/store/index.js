import { createStore } from 'vuex';
import getters from './getter';
import alert from './modules/alert';
import user from './modules/user';

export default createStore({
  state: {
    token: window.sessionStorage.getItem('token'),
  },
  mutations: {},
  actions: {
    name: (state, newValue) => {
      this.state.name = newValue;
    },
  },
  getters,
  modules: { alert, user },
});
