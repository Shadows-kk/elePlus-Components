
import {RuleItem} from './rule'
import {CSSProperties} from 'vue'
// 可配置的表单

// 表单每一项的配置选项
export interface FormOptions {
  // 表单显示的元素
  type: 'autocomplete' | 'cascader' | 'checkbox'| 'checkbox-group' | 'checkbox-button' |
   'color-picker'|'date-picker'|'input'|'input-number'|'radio-group'|'radio'| 'radio-button' 
   |'rate'|'select'|'option'|'slider'|'switch'|'time-picker'|'time-select'|'transfer'|'upload',
  // 表单项的值
  value:any,
  // 表单项label
  label?:string,
  // 表单项的标识 通常用于表单验证
  prop?:string,
  // 表单项的验证规则
  rules?: RuleItem[],
  placeholder?:string,
  // 表单元素特有的属性
  attrs?:{
    clearable?:boolean,
    showPassword?:boolean,
    disabled?:boolean,
    // 样式属性
    style?:CSSProperties
  },
  // 表单项的子元素
  children?:FormOptions[]

}