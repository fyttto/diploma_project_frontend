import { createRouter, createWebHistory } from 'vue-router';

// 所有权限通用路由表
export const constantRoutes = [
  {
    path: '/',
    redirect: '/home',
    meta: {
      title: '主页',
      requireAuth: true,
      role: [1, 0],
    },
  },
  {
    path: '/home',
    name: 'home',
    redirect: '/dashboard',
    component: () => import('@/view/index.vue'),
    meta: {
      title: '主页',
      requireAuth: true,
      role: [1, 0],
    },
    children: [
      {
        path: '/dashboard',
        component: () => import('@/view/home/home-data.vue'),
        name: 'Data',
        meta: {
          title: '数据',
          requireAuth: true,
          role: [1, 0],
        },
      },

      {
        path: '/search',
        component: () => import('@/view/alert/alert-search.vue'),
        name: 'search',
        meta: {
          title: '报警查询',
          role: [1, 0],
          requireAuth: true,
        },
      },
      {
        path: '/manage-person',
        component: () => import('@/view/manage/manage-person/index.vue'),
        name: 'manage-person',
        meta: {
          title: '人员管理',
          role: [1, 0],
          requireAuth: true,
        },
      },
      {
        path: '/manage-vehicle',
        component: () => import('@/view/manage/manage-vehicle/index.vue'),
        name: 'manage-vehicle',
        meta: {
          title: '设备管理',
          role: [1, 0],
          requireAuth: true,
        },
      },
      {
        path: '/detail',
        component: () => import('@/view/alert/alert-detail.vue'),
        name: 'detail',
        meta: {
          title: '报警详情',
          role: [1, 0],
          requireAuth: true,
        },
      },
      {
        path: '/personal',
        component: () => import('@/view/personal-homepage/personal-page.vue'),
        name: 'personal-page',
        meta: {
          title: '个人中心',
          role: [1, 0],
          requireAuth: true,
        },
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/view/login/login-user.vue'),
    name: 'Login',
    meta: {
      title: '登录',
    },
  },
  {
    path: '/register',
    component: () => import('@/view/register/index.vue'),
    name: 'register',
    meta: {
      title: '注册',
    },
  },
  {
    path: '/404',
    component: () => import('@/view/error-page/404.vue'),
    name: 'error',
  },
  {
    path: '/401',
    component: () => import('@/view/error-page/401.vue'),
    name: '无权限',
  },
  { path: '/:pathMatch(.*)*', redirect: '/404' },
];

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
});

export default router;
