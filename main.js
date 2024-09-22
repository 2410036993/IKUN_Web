import {
  createApp
} from 'vue'
import App from './App.vue'
import router from './router'
// 打字机效果
import vuetyped from 'vue3typed'
// element框架
import ElementPlus from 'element-plus'
// element样式
import 'element-plus/dist/index.css'
// 中文
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// 图标
import '/src/styles/iconfont/index.css'
// 视频组件
import vue3videoPlay from 'vue3-video-play' // 引入组件
import 'vue3-video-play/dist/style.css' // 引入css
// md的样式
import 'md-editor-v3/lib/style.css'

const app = createApp(App)
app.use(vue3videoPlay)
app.use(router)
app.use(ElementPlus, {
  locale: zhCn
})
app.use(vuetyped)
app.mount('#app')