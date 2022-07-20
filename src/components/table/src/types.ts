export interface ITableOptions {
  // 表头
  label:string
  // 字段名称
  prop?:string,
  // 列宽度
  width?:string|number,
  // 对齐方式
  align?:'left'|'center'|'right'
  // 自定义列模版名称
  slot?:string,
  // 是否是操作项
  action?:boolean
}