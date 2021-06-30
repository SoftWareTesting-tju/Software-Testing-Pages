import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
//导入全局样式表
import './assets/css/global.css'
import axios from 'axios'
import * as echarts from 'echarts'
http://mzzhu.com:8005/
//设置请求根路径
// axios.defaults.baseURL = 'http://39.108.128.87:8005/'
axios.defaults.baseURL = 'http://mzzhu.com:8005/'
// axios.defaults.baseURL = 'http://127.0.0.1:5000/'
//每个vue组件能直接访问到$http发起Ajax请求
Vue.prototype.$http = axios

Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
