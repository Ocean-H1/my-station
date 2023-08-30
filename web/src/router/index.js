import Vue from 'vue';
import VueRouter from 'vue-router';
import NProgress from 'nprogress';
import routes from './routes';

// 解决报错
const originalPush = VueRouter.prototype.push;
const originalReplace = VueRouter.prototype.replace;
// push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};
// replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject);
  return originalReplace.call(this, location).catch(err => err);
};

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  // 通过路由跳转页面后，窗口始终位于页面顶部
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});


router.afterEach((to, from) => {

  // 关闭进度条
  NProgress.done();
});

router.beforeEach((to, from, next) => {
  // 开启进度条
  NProgress.start();

  // const isLogin = sessionStorage.getItem('isLogin');
  // const isRoot = sessionStorage.getItem('isRoot');
  const isLogin = true;
  const isRoot = true;
  if (to.meta.isNeedLogin && !isLogin) {
    alert('您还未登录，请先登录！');
    next(
      {
        path: '/login',
        query: {
          redirectPath: to.path
        }
      }
    );
  }

  if (isLogin && to.meta.isNeedRoot && !isRoot) {
    alert('对不起，您无权访问！');
    next(
      {
        path: '/help'
      }
    );
  }



  // 根据路由动态设置网页标题
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();



});
export default router;
