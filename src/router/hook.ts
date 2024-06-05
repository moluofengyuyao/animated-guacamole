
import { userStore } from '@/store'
import { clearStorage } from '@/utils/status-code'
import { message } from 'ant-design-vue'
import { NavigationGuard } from 'vue-router'
import {VerifyTk} from '@/api'

interface HooksType {
  [key: string]: NavigationGuard
}
const hooks: HooksType = {
  getToken: async (to, from, next) => {
    // debugger
    if (getQueryVariable("token")) {
      const useUser = userStore()
      window.systemType = getQueryVariable("systemType")|| '1'
      var token = getQueryVariable("token")//获取token
      let pa1 = {
        hyxx: window.sessionStorage.getItem('hyxx')||'1',
        access_token: token,
        info: true
      }
      let resTK:any = await VerifyTk(pa1)
      if(resTK){
        window.sessionStorage.setItem("UserInfo", window.btoa(window.encodeURIComponent(JSON.stringify(resTK))));

        useUser.getUserInfo(resTK)
        useUser.changeToken(token)
      }
      next()
      // debugger
    }else if(!sessionStorage.getItem('UserInfo') && (to.name != 'login') ){
      message.error('用户信息缺失,请重新登录')
      clearStorage()
      next()
    }else{
      next()
    }
  },
  // 解决主页面跳转后子系统pinia数据丢失,重新赋值
  changePiniaState: async (to, from, next) => {
    next()
  },
  test: (to, from, next) => {
    next()
  }
}
function getQueryVariable(variable:any){
  let href = window.location.href
  let query = href.substring(href.indexOf('?')+1);
  let vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    let pair = vars[i].split("=");
    if (pair[0] == variable) {
        return pair[1];
    }
  }
  return (false);
}
export default hooks
