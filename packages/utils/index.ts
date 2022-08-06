// 将icon图标第一个大写字母转化成-连接
export const toLine = (value:string) =>{
  return value.replace(/(A-Z)g/,'-$1').toLocaleLowerCase()
}