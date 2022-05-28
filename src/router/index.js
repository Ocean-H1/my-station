import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'

// 解决报错
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
// push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
// replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch(err => err)
}

// 路由懒加载
const First = () => import('../views/first/first.vue')
const refund = () => import('../views/refund/refund.vue')
const help = () => import('../views/help/help.vue')
const advise = () => import('../views/advise/advise.vue')
const about = () => import('../views/about/about.vue')
const StaionMap = () => import('../views/stationMap/stationMap.vue')
const Login = () => import('@/components/content/Login/login.vue')
const Register = () => import('@/components/content/Register/register')
const purchase = () => import('../views/purchase/purchase.vue')
const searchTicket = () => import('../views/purchase/components/searchTicket.vue')
const submitOrder = () => import('../views/purchase/components/submitOrder.vue')
const confirmOrder = () => import('../views/purchase/components/confirmOrder.vue')
const payQrcode = () => import('../views/purchase/components/payQrcode.vue')

// 找回密码
const reback = () => import('@/components/content/rebackPsd/rebackPsd.vue')
// 后台管理模块相关组件
const shiftModule = () => import('../components/content/adminModule/shiftModule.vue')
const ticketModule = () => import('../components/content/adminModule/ticketModule.vue')

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    redirect: '/first'
  },
  {
    path: '/first',
    component: First,
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
    component: () => import('../views/person'),
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
        path:'',
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
        path: '/payQrcode',
        meta: {
          title: '购票 | 支付订单',
          isNeedLogin: true
        },
        component: payQrcode
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
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
  // 通过路由跳转页面后，窗口始终位于页面顶部
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})


router.afterEach((to, from) => {

  // 关闭进度条
  NProgress.done()
})

router.beforeEach((to, from, next) => {
  // 开启进度条
  NProgress.start()

  const isLogin = sessionStorage.getItem('isLogin')
  const isRoot = sessionStorage.getItem('isRoot')
  if (to.meta.isNeedLogin && !isLogin) {
    alert('您还未登录，请先登录！')
    next(
      {
        path: '/login',
        query: {
          redirectPath: to.path
        }
      }
    )
  }

  if ( isLogin && to.meta.isNeedRoot && !isRoot) {
    alert('对不起，您无权访问！')
    next(
      {
        path: '/help'
      }
    )
  }



  // 根据路由动态设置网页标题
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()



})
export default router
