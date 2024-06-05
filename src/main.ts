/*
 * @Author: zhuangyating 2114380985@qq.com
 * @Date: 2024-05-14 17:39:42
 * @LastEditors: zhuangyating 2114380985@qq.com
 * @LastEditTime: 2024-05-24 09:05:47
 * @FilePath: \cth-ddgl-web\src\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import initSvgIcon from '@/plugins/SvgIcon'
import router from './router'
import App from './App.vue'
// import * as at from 'array.prototype.at'
import 'normalize.css/normalize.css'
import '@/assets/styles/mapbox/compassengine-gl.scss'
import '@/assets/styles/mapbox/mapbox-gl-draw.scss'
import '@/assets/styles/style/base.css'
import '@/assets/styles/style/layout.css'
import '@/assets/styles/style/tree.css'
import { baseurl, config, env } from '@/utils/base-url.js'
import ElementPlus from 'element-plus'
//配置国际化 下面的注释是为了防止ts检查，导致打包报错，忽略类型检查
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
import '@/assets/styles/index.scss'
import { roleIsShow ,$isViewer ,clickOutside } from '@/utils/common.js'
// console.log(import.meta.env)
// console.log(env);

//将配置访问路径代码块迁移到main.ts
CONFIG = config //获取baseURL配置
baseUrl = baseurl
ENV = env
// at.shim() // 使用shim方法
const app = createApp(App)
app.config.globalProperties.roleIsShow = roleIsShow
app.config.globalProperties.$isViewer  = $isViewer 
app.directive('click-outside', clickOutside) //自定义指令
const store = createPinia()
store.use(piniaPluginPersistedstate)
app.use(ElementPlus, {
locale: zhCn, //这是国际化配置，比如分页时候
})
app.use(store)
app.use(router)
app.use(initSvgIcon)

app.mount('#app')
