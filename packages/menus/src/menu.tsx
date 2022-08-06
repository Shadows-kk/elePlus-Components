import { defineComponent,PropType,useAttrs } from "vue";
import * as Icons from '@element-plus/icons-vue'
import './index.scss'
export default defineComponent({
  props:{
    data: {
      type: Array as PropType<any[]>,
      required: true,
    },
    // 默认选中菜单
    defaultActive: {
      type: String,
      default: "",
    },
    // 是否是路由模式
    router: {
      type: Boolean,
      default: false,
    },
    // 键名 不再限制传递过来的data字段
    // 1.菜单标题的键名
    name: {
      type: String,
      default: "name",
    },
    // 2.菜单标识的键名
    index: {
      type: String,
      default: "index",
    },
    // 3.菜单图标的键名
    icon: {
      type: String,
      default: "icon",
    },
    // 4.菜单子菜单的键名
    children: {
      type: String,
      default: "children",
    },
  },
  setup(props,ctx){
    let attrs = useAttrs()
    // 封装一个渲染无限层级菜单的方法，函数会返回jsx的代码
    let renderMenu = (data: any[]) => {
      return data.map((item:any) => {
        // 每个菜单的图标
        item.i = (Icons as any)[item[props.icon]!]
        // 处理sub-menu插槽
        let slots = {
          title: () =>{
            return <>
              <item.i/>
              <span>{item[props.name]}</span>
            </>
          }
        }
        // 递归渲染children
        if(item[props.children]&&item[props.children].length){
          return (
            <el-sub-menu index={item[props.index]} v-slots={slots}>
              {renderMenu(item[props.children])}
            </el-sub-menu>
          )
        }
        // 正常渲染普通的菜单
        return (
          <el-menu-item index={item[props.index]}>
            <item.i/>
            <span>{item[props.name]}</span>
          </el-menu-item>
        )
      })
    }
    return () =>{
      return(
        <el-menu class='menu-icon-svg' default-active={props.defaultActive} router={props.router} {...attrs}>
          {renderMenu(props.data)}
        </el-menu>
      )
    }
  }
})