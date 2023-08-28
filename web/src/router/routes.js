/**
 * @Description: 路由列表
 * @Author: OceanH
 * @Date: 2023-08-28 10:06:03
 */

// 路由懒加载
const Index = () => import('@pages/index/index.vue');
const refund = () => import('@pages/refund/refund.vue');
const help = () => import('@pages/help/help.vue');
const advise = () => import('@pages/advise/advise.vue');
const about = () => import('@pages/about/about.vue');
const StaionMap = () => import('@pages/stationMap/stationMap.vue');
const Login = () => import('@/components/content/Login/login.vue');
const Register = () => import('@/components/content/Register/register');
const purchase = () => import('@pages/purchase/purchase.vue');
const searchTicket = () => import('@pages/purchase/components/searchTicket.vue');
const submitOrder = () => import('@pages/purchase/components/submitOrder.vue');
const confirmOrder = () => import('@pages/purchase/components/confirmOrder.vue');
const payQrcode = () => import('@pages/purchase/components/payQrcode.vue');
const getRideCode = () => import('@pages/purchase/components/getRideCode.vue');
// 找回密码
const reback = () => import('@/components/content/rebackPsd/rebackPsd.vue');
// 后台管理模块相关组件
const shiftModule = () => import('../components/content/adminModule/shiftModule.vue');
const ticketModule = () => import('../components/content/adminModule/ticketModule.vue');

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: Index,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/refund',
    component: refund,
    meta: {
      title: '退票'
    }
  },
  {
    path: '/help',
    component: help,
    meta: {
      title: '帮助中心'
    }
  },
  {
    path: '/advise',
    component: advise,
    meta: {
      title: '投诉建议'
    }
  },
  {
    path: '/about',
    component: about,
    meta: {
      title: '关于我们'
    }
  },
  {
    path: '/stationMap',
    component: StaionMap,
    meta: {
      title: '车站地图'
    }
  },
  {
    path: '/login',
    component: Login,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/rebackPsd',
    component: reback,
    meta: {
      title: '找回密码'
    }
  },
  {
    path: '/register',
    component: Register,
    meta: {
      title: '注册'
    }
  },
  {
    path: '/person',
    component: () => import('@pages/person'),
    meta: {
      title: '个人中心',
      isNeedLogin: true,
    },
    children: [{
      path: '',
      meta: {
        title: '基本资料',
        isNeedLogin: true,
      },
      component: () => import('@/components/content/person/children/info'),
    },
    {
      path: 'changePassword',
      meta: {
        title: '修改密码',
        isNeedLogin: true,
      },
      component: () => import('@/components/content/person/children/changePassword'),
    },
    {
      path: 'passenger',
      meta: {
        title: '常用乘车人',
        isNeedLogin: true,
      },
      component: () => import('@/components/content/person/children/passenger'),
    },
    {
      path: 'contacts',
      meta: {
        title: '常用联系人',
        isNeedLogin: true,
      },
      component: () => import('@/components/content/person/children/contacts'),
    },

    {
      path: 'allOrder',
      meta: {
        title: '所有订单',
        isNeedLogin: true,
      },
      component: () => import('@/components/content/person/children/allOrder'),
    },
    {
      path: 'paidOrder',
      meta: {
        title: '已支付单',
        isNeedLogin: true,
      },
      component: () => import('@/components/content/person/children/paidOrder'),
    },
    {
      path: 'waitOrder',
      meta: {
        title: '待支付单',
        isNeedLogin: true,
      },
      component: () => import('@/components/content/person/children/waitOrder'),
    },
    {
      path: 'refundOrder',
      meta: {
        title: '退款完成',
        isNeedLogin: true,
      },
      component: () => import('@/components/content/person/children/refundOrder'),
    },
    ]
  },
  {
    path: '/purchase',
    component: purchase,
    meta: {
      title: '购票'
    },
    children: [
      {
        path: '',
        component: searchTicket,
        meta: {
          title: '购票 | 车票查询'
        }
      },
      {
        path: 'submitOrder',
        meta: {
          title: '购票 | 提交订单',
          isNeedLogin: true
        },
        component: submitOrder
      },
      {
        path: 'confirmOrder',
        meta: {
          title: '购票 | 确认订单',
          isNeedLogin: true
        },
        component: confirmOrder
      },
      {
        path: 'payQrcode',
        meta: {
          title: '购票 | 支付订单',
          isNeedLogin: true
        },
        component: payQrcode
      },
      {
        path: 'getRideCode',
        meta: {
          title: '购票 | 乘车码',
          isNeedLogin: true
        },
        component: getRideCode
      },
    ]
  },
  {
    path: '/shiftModule',
    meta: {
      title: '后台管理 | 班次管理',
      isNeedLogin: true,
      isNeedRoot: true
    },
    component: shiftModule,
  },
  {
    path: '/ticketModule',
    meta: {
      title: '后台管理 | 票务管理',
      isNeedLogin: true,
      isNeedRoot: true
    },
    component: ticketModule,
  }
];

export default routes;