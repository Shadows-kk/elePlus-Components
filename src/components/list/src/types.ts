
// 列表每一项的属性
export interface IlistItem {
  avatar?:string,
  title?:string,
  desc?:string,
  time?:string,
  tag?:string,
  tagType?:''| 'success'|'info'|'warning'|'danger'
}
// 列表属性
export interface Ilist{
  title: string,
  content: IlistItem[]
}
// 操作选项
export interface Ioperation{
  text:string,
  icon?:string
}