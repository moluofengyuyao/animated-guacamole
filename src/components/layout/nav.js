/*
 * @Author: zhuangyating 2114380985@qq.com
 * @Date: 2024-05-16 19:21:30
 * @LastEditors: zhuangyating 2114380985@qq.com
 * @LastEditTime: 2024-05-22 10:32:58
 * @FilePath: \cth-ddgl-web\src\components\layout\nav.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const navList = [
  {
    name: "资料下载",
    description: "资料下载",
    // icon: "&#xe741;",
    icon: "资料下载",
    router: "docsdownload",
  },
  {
    name: "培训课程",
    description: "培训课程",
    // icon: "&#xe747;",
    icon: "培训课程",
    router: "activityClass",
  },
  {
    name: "线上答疑",
    description: "线上答疑",
    // icon: "&#xe747;",
    icon: "线上答疑",
    router: "onLineAnswer",
  },
]

export function getNavList() {
  return navList
}