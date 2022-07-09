export default interface ImenuItem {
  icon?: string,
  // 用来存处理之后的图标
  i?: any,
  name: string,
  // 导航的标识
  index: string,
  children?: ImenuItem[]
}