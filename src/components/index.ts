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
  chooseCity
]
export default {
  install(app:App){
    components.map(item => {
      app.use(item)
    })
  }
}