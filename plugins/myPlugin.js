import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'// element-ui的css
Vue.use(ElementUI)

// 图片请求头部
Vue.prototype.$host = 'http://127.0.0.1:8089/images/'
// 后台请求头部
Vue.prototype.$backhost = '127.0.0.1:8089/'

// 引入七月大佬的聊天界面MChat的js库
import '@/lib/MChat.css'
import MChat from '@/lib/MChat.umd'
Vue.use(MChat)

// import VueQriously from 'vue-qriously'
// Vue.use(VueQriously)
