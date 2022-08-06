import progress from './src/index.vue'
import {App} from 'vue' 
// 让这个组件可以通过use的形式使用,要么是一个函数，函数的名称是install,要么是一个对象，对象里面有个属性是install
export default {
  install(app:App){
    app.component('m-progress',progress)
  }
}