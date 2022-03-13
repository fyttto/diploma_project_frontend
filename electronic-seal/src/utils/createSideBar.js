export default function createSideBar() {
  return [
    {
      meta: {
        title: '首页',
        icon: 'House',
      },
      path: '/dashboard',
      hidden: false,
    },

    {
      meta: {
        title: '查询',
        icon: 'Search',
      },
      path: '/',
      hidden: false,
      children: [
        {
          meta: {
            title: '报警查询',
            icon: 'WarningFilled',
          },
          path: '/search',
          hidden: false,
          children: [],
        },
        {
          meta: {
            title: '报警管理',
            icon: 'Warning',
          },
          path: '/detail',
          hidden: false,
          children: [],
        },
      ],
    },
    {
      meta: {
        title: '人员管理',
        icon: 'Stamp',
      },
      path: '/manage-person',
      hidden: false,
      children: [],
    },
    {
      meta: {
        title: '设备查询',
        icon: 'Van',
      },
      path: '/manage-vehicle',
      hidden: false,
      children: [],
    },

    {
      meta: {
        title: '个人中心',
        icon: 'Avatar',
      },
      path: '/personal',
      hidden: false,
      children: [],
    },
    {
      meta: {
        title: '关于',
        icon: 'QuestionFilled',
      },
      path: 'test1',
      hidden: false,
      children: [],
    },
  ];
}
