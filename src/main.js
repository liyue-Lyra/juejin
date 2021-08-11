import Vue from 'vue'
import App from './App.vue'
//引入路由器
import router from './router'
import VueRouter from 'vue-router'

import './assets/icons/iconfont.css'
import 'lib-flexible'
//应用插件
Vue.use(VueRouter)

Vue.config.productionTip = false

// 设置浏览器标题
Vue.directive('title', {
  inserted: function (el) {
    document.title = el.dataset.title
  }
})

new Vue({
  el:'#app',
  render: h => h(App),
  router:router,
  beforeCreate() {
    Vue.prototype.$bus = this //安装全局事件总线
  },
  
})
