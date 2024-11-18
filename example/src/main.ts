import { createApp } from 'vue'
import App from './App.vue'
import XUI from '@xxl/xxl-ui'
// import ElementPlus from 'element-plus'
import '@xxl/xxl-ui/dist/es/style.css'
import 'element-plus/dist/index.css'
const app = createApp(App)

app.use(XUI)
// app.use(ElementPlus)

app.mount('#app')
