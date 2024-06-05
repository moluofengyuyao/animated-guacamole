/*
 * @Author: zhuangyating 2114380985@qq.com
 * @Date: 2024-05-24 17:01:33
 * @LastEditors: zhuangyating 2114380985@qq.com
 * @LastEditTime: 2024-05-28 17:32:47
 * @FilePath: \cth-ddgl-web\src\utils\base-url.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
let baseurl = {
  // 司南IP
  development: {
    login: 'https://xtgc.geo-compass.com/cth_web',
    overPlanUrl: 'http://ddglyh.geo-compass.com/work_back/api/v1/overPlan',
    fileUrl: 'http://ddglyh.geo-compass.com/fileserver/api/v1/file',
    eaMonReportUrl:'http://ddglyh.geo-compass.com/work_back/api/v1/eaMonReport',
    userUrl:'http://ddglyh.geo-compass.com/user_back/api/v1',
    workUrl:'http://ddglyh.geo-compass.com/work_back/api/v1',
    newsUrl:'http://ddglyh.geo-compass.com/news_back/api/v1/news',
    taskUrl:'http://ddglyh.geo-compass.com/task_back/api/v1/task_work',
    previewUrl: 'http://ddglyh.geo-compass.com/fileserver/',
    qhTreeUrl:'https://xtgc.geo-compass.com/gjjcth/cth/ddgl/api/v1/xzqh'
  },
  // 司南域名
  snym: {
    login: 'https://xtgc.geo-compass.com/cth_web',
    overPlanUrl: 'https://xtgc.geo-compass.com/gjjcth/cth/ddgl/api/v1/ddgl_work/overPlan',
    fileUrl: 'https://xtgc.geo-compass.com/gjjcth/cth/ddgl/api/v1/ddgl_file/file',
    eaMonReportUrl:'https://xtgc.geo-compass.com/gjjcth/cth/ddgl/api/v1/ddgl_work/eaMonReport',
    userUrl:'https://xtgc.geo-compass.com/gjjcth/cth/user/api/v1',
    workUrl:'https://xtgc.geo-compass.com/gjjcth/cth/ddgl/api/v1/ddgl_work',
    newsUrl:'https://xtgc.geo-compass.com/gjjcth/cth/ddgl/api/v1/ddgl_news/news',
    taskUrl:'https://xtgc.geo-compass.com/gjjcth/cth/ddgl/api/v1/task_work',
    previewUrl: 'https://xtgc.geo-compass.com/gjjcth/cth/ddgl/api/v1/fileserver/',
    qhTreeUrl:'https://xtgc.geo-compass.com/gjjcth/cth/ddgl/api/v1/xzqh'
  },
  // 正式-仅看数据
  fxpc:{
    login: 'https://xtgc.geo-compass.com/cth_web',
    overPlanUrl: 'https://fxpc.mem.gov.cn/work_back/api/v1/overPlan',
    fileUrl: 'https://fxpc.mem.gov.cn/fileserver/api/v1/file',
    eaMonReportUrl:'https://xtgc.geo-compass.com/gjjcth/cth/ddgl/api/v1/ddgl_work/eaMonReport',
    userUrl:'https://fxpc.mem.gov.cn/user_back/api/v1',
    workUrl:'https://fxpc.mem.gov.cn/work_back/api/v1',
    newsUrl:'https://fxpc.mem.gov.cn/news_back/api/v1/news',
    taskUrl:'https://fxpc.mem.gov.cn/task_back/api/v1/task_work',
    previewUrl:'https://fxpc.mem.gov.cn/fileserver/'
  }
}

let env = window.location.hostname.includes('xtgc.geo-compass.com')
  ? 'snym'
  : 'development'
let hostname = window.location.hostname
//国家局外网
let TdtUrls_test = [
  'https://t0.tianditu.gov.cn',
  'https://t1.tianditu.gov.cn',
  'https://t2.tianditu.gov.cn',
  'https://t3.tianditu.gov.cn',
  'https://t4.tianditu.gov.cn',
  'https://t5.tianditu.gov.cn',
  'https://t6.tianditu.gov.cn',
  'https://t7.tianditu.gov.cn'
]

let config = {
  //地图地址判断
  drawMapStyle: hostname.includes('xtgc.geo-compass.com')
    ? './static/style/drawMapStyle.json'
    : '/static/style/drawMapStyle.json',
  TdtUrls: TdtUrls_test,
  img_wmts: {} // 各省地图添加
}
export { baseurl, config, env }
