import { App } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
import 'virtual:svg-icons-register'
const SvgIconIn = (app: App) => {
  // 全局注册svg-icon组件
  app.component('svg-icon', SvgIcon)
}
export default SvgIconIn
