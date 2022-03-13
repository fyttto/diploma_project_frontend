import { createApp } from 'vue';

import 'element-plus/dist/index.css';
import * as ElIcons from '@element-plus/icons-vue';
import vue3videoPlay from 'vue3-video-play'; // 引入组件
import 'vue3-video-play/dist/style.css'; // 引入css

import App from './App.vue';

import store from './store';
import router from './router';

import './index.css';
import 'normalize.css/normalize.css';

import '@/utils/mock';

import './premission';

const app = createApp(App);

Object.keys(ElIcons).forEach((key) => {
  app.component(key, ElIcons[key]);
});

app.use(store);
app.use(router);
app.use(vue3videoPlay);

app.mount('#app');
