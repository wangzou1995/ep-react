import { defineConfig } from 'umi';
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      name: 'EP交接',
      path: '/handover',
      routes: [
        {
          name: 'EP交接信息',
          path: '/handover/basic',
          icon: 'home',
          component: './Handover/basic',
        },
        {
          
          path: '/handover/detail',
          component: './Handover/detail',          
        },
      ],
    },
    {
      name: 'EP特殊处理',
      path: '/special',
      routes: [
        {
          name: 'CN35',
          path: '/special/cn35',
          component: './Special/CN35'
        }
      ]
    },
    {
      path: '/',
      component: '@/pages/index',
    },
  ],
  dva: {},
  layout: {
    title: 'EP系统'
  },
  locale: {
    default: 'zh-CN',
    antd: true,
    title: false,
    baseNavigator: false,
    baseSeparator: '-',
  }
});
