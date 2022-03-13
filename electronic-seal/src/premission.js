import { ElMessage } from 'element-plus';
import router from './router';
import store from './store';

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }

  if (to.matched.some((m) => m.meta.requireAuth)) {
    const hasToken = store.getters.token;
    if (hasToken) {
      if (to.path === 'login') {
        next({ path: '/' });
        ElMessage.info('已经登录无需重新登录');
      } else {
        const hasRoles =
          window.localStorage.getItem('role') ||
          (store.getters.role && store.getters.role.length > 0);
        if (hasRoles) {
          if (to.meta.role.includes(Number(hasRoles))) {
            next();
          } else {
            next({ path: '/401' });
          }
        } else {
          ElMessage.error('身份信息出错');
          next({ path: '/login' });
        }
      }
    } else {
      ElMessage.error('提示：请您先登录账户');
      next({ path: '/login' });
    }
  } else {
    next();
  }
});
