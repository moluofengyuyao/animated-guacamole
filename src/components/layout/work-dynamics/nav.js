/*
 * @Author: zhuangyating 2114380985@qq.com
 * @Date: 2024-05-16 19:21:30
 * @LastEditors: zhuangyating 2114380985@qq.com
 * @LastEditTime: 2024-05-22 11:17:51
 * @FilePath: \cth-ddgl-web\src\components\layout\nav.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
//常态工作管理
export const navList = [
  {
    name: "工作动态",
    description: "工作动态",
    // icon: '&#xe740;',
    icon: "资料下载",
    router: "WorkDynamicsList",
  },
  {
    name: "工作上报",
    description: "工作上报",
    // icon: '&#xe73f;',
    icon: "线上答疑",
    router: "WorkReport",
  }
]

export function getNavList() {
  return navList
}