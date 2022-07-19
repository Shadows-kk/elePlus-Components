
import {RuleItem} from './rule'
import {CSSProperties} from 'vue'
import { ValidateFieldsError } from 'async-validator'
// 可配置的表单
// 表单每一项的配置选项
export interface IFormOptions {
  // 表单显示的元素
  type: 'autocomplete' | 'cascader' | 'checkbox'| 'checkbox-group' | 'checkbox-button' |
   'color-picker'|'date-picker'|'input'|'input-number'|'radio-group'|'radio'| 'radio-button' 
   |'rate'|'select'|'option'|'slider'|'switch'|'time-picker'|'time-select'|'transfer'|'upload'|'editor',
  // 表单项的值,上传组件没有value
  value?:any,
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
  children?:IFormOptions[]
  // 单独处理上传组件的属性和方法
  uploadAttrs?:{
    action:string,
    headers?:object,
    method?:'put | post | patch',
    multiple?:boolean,
    data?:any
    name?:string,
    withCredentials?:boolean,
    showFileList?:boolean,
    drag?:boolean,
    accept?:string,
    fileList?:any[],
    listType?:"text" | "picture" | "picture-card",
    autoUpload?:boolean,
    disabled?:boolean,
    limit?:number
  }
}
interface Callback {
  (isValid?: boolean, invalidFields?: ValidateFieldsError): void,
}
export interface ValidateFieldCallback {
  (message?: string, invalidFields?: ValidateFieldsError): void,
}
export interface IFormInstance {
  registerLabelWidth(width: number, oldWidth: number): void,
  deregisterLabelWidth(width: number): void,
  autoLabelWidth: string | undefined,
  emit: (evt: string, ...args: any[]) => void,
  labelSuffix: string,
  inline?: boolean,
  model?: Record<string, unknown>,
  size?: string,
  showMessage?: boolean,
  labelPosition?: string,
  labelWidth?: string,
  rules?: Record<string, unknown>,
  statusIcon?: boolean,
  hideRequiredAsterisk?: boolean,
  disabled?: boolean,
  validate: (callback?: Callback) => Promise<boolean>,
  resetFields: () => void,
  clearValidate: (props?: string | string[]) => void,
  validateField: (props: string | string[], cb: ValidateFieldCallback) => void,
}