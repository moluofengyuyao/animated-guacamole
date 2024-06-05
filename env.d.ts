/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module 'array.prototype.at'
declare let baseUrl: any
declare let ENV: string
declare let CONFIG: any
declare let systemType: any
declare const compassengine: any
declare module '@/utils/common.js' // 自定义包引用
