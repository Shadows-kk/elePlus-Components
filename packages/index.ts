import {App} from 'vue'
import chooseArea from './chooseArea'
import chooseIcon from './chooseIcon'
import trend from './trend'
import notification from './notification'
import list from './list'
import menus from './menus'
import progress from './progress'
import chooseTime from './chooseTime'
import chooseDate from './chooseDate'
import chooseCity from './chooseCity'
import calendar from './calendar'
import form from './form'
import modelForm from './modelForm'
import table from './table'
import loading from './loading'
import './style/base.scss'
import './style/ui.scss'
import * as Icons from '@element-plus/icons-vue'
import {toLine} from './utils/index'
const components = [
  chooseArea,
  chooseIcon,
  trend,
  notification,
  list,
  menus,
  progress,
  chooseTime,
  chooseDate,
  chooseCity,
  form,
  calendar,
  table,
  modelForm,
  loading
]
export default {
  install(app:App){
    components.map(item => {
      app.use(item)
    })
    for(let i in Icons){
      // 注册组件
      app.component(`el-icon-${toLine(i)}`,(Icons as any)[i])
      // console.log((Icons as any)[i]);
    }
  }
}