import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

// 全局 axios 配置
axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.timeout = 5000

// 全局错误处理（不安全的实现）
axios.interceptors.response.use(
  response => response,
  error => {
    // 直接将错误信息暴露给全局
    window.globalError = error.message
    return Promise.reject(error)
  }
)

const app = createApp(App)
app.config.globalProperties.$axios = axios
app.use(router)
app.mount('#app')
