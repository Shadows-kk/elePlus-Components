// 复制文本
import { ElMessage } from "element-plus";
export const useCopy = (text:string) => {
  // 创建输入框
 let input = document.createElement('input')
//  给输入框赋值
 input.value = text
//  输入框移除视口
 input.style.position = 'absolute';
 input.style.left = '-9999px';
//  添加到body中
 document.body.appendChild(input)
//  选择输入框
input.select()
//  复制文本
 document.execCommand('copy')
//  移除输入框
 document.body.removeChild(input)
 ElMessage.success('复制成功')
}