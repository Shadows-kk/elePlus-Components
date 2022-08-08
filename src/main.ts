import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as Icons from '@element-plus/icons-vue'
import {toLine} from './utils/index'
import './mock'
// import components from './components'
// 从打包的lib文件夹中引入全部的组件和样式
import components from '../lib/index.es.js'
import '../lib/style.css'
// 从打包的lib文件夹中引入单个的组件和样式
// import chooseIcon from '../lib/chooseIcon/index.es'
// import ../lib/chooseIcon/style.css'

const app = createApp(App)
// 全局注册图标 牺牲一点性能 重新命名成以el-icon-xxx开头
for(let i in Icons){
  // 注册组件
  app.component(`el-icon-${toLine(i)}`,(Icons as any)[i])
  // console.log((Icons as any)[i]);
}
app.use(router)
.use(ElementPlus)
// .use(chooseIcon)
.use(components)
app.mount('#app')
