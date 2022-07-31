import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store/store'
import moment from 'moment'

// 引入ElementUi
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入全局样式文件
import '../src/assets/css/global.css'
Vue.use(ElementUi)
// 引入NProgress
import NProgress from 'nprogress'
// 引入nprogress样式文件
import 'nprogress/nprogress.css'
// 引入公共js函数 主要是一些公共的方法 比如MD5加密
import utils from '@/utils/utils.js'
import {baseURL} from '../config'
Vue.config.productionTip = false
// 全局挂载axios
Vue.prototype.$http = axios
// 全局挂载
Vue.prototype.$utils = utils
Vue.prototype.$moment = moment
// 配置请求的根路径
axios.defaults.baseURL = baseURL
// 设置request拦截器，在请求之前添加sessionid，展示进度条
axios.interceptors.request.use((config) => {
  // 展示进度条
  NProgress.start()
  // 添加SessionId到请求头中
  config.headers.SessionId = window.sessionStorage.getItem('SessionId')
  return config
})

// 设置response拦截器，关闭进度条
axios.interceptors.response.use((res) => {
  // 关闭进度条
  NProgress.done()
  return res
})

new Vue({
  router,
  render: (h) => h(App),
  store,
}).$mount('#app')

