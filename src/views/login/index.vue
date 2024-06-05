<!--
 * @Author: zhuangyating 2114380985@qq.com
 * @Date: 2024-05-20 14:57:55
 * @LastEditors: zhuangyating 2114380985@qq.com
 * @LastEditTime: 2024-05-29 11:38:01
 * @FilePath: \cth-ddgl-web\src\views\login\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
          <el-button
            @click="getLogininfo(v)"
          >
            获取登录信息
          </el-button>
</template>
<script setup lang="ts">
import router from '@/router'
import { ref } from 'vue'
import { Base64 } from 'js-base64'
import { getFunctionList , login} from '@/api'
import { message } from 'ant-design-vue'
import { userStore } from '@/store'
const user = userStore()
const changeZT = () => {
  router.push({
    name: 'docsdownload'
  })
}
// const password = ref('cthpc@2024')
// const username = ref('深圳市南山区应急管理局管理员')
const password = ref('snfxpc@0328')
const username = ref('河北省应急管理厅管理员')
// const password = ref('snfxpc@0328')
// const username = ref('gxsnadmin')
const usercode = ref('')
   const  getLogininfo =async()=> {
      let params = {
        username: username.value,
        pwd:  Base64.encode(password.value),
        type: '1'
      }
      let res :any = await login(params)
      
      if (res) {
        user.getUserInfo(res)
        let json = JSON.stringify(res)
        window.sessionStorage.setItem("UserInfo", window.btoa(window.encodeURIComponent(json)));
        window.sessionStorage.setItem('access_token', res.token)
        window.sessionStorage.setItem('zj_access_token', res.token)
        user.changeToken(res.token)
        FunctionList(res.user.user_id)
        changeZT()
      } else {
        message.error(res.data.msg)
      }
    }
   const FunctionList = async(userid:string)=> {
      let res :any = await getFunctionList({userid})
      if(res){
          let userRole = res
          // debugger
          window.sessionStorage.setItem("userRole", window.btoa(window.encodeURIComponent(JSON.stringify(userRole))));
          userRole.forEach((v:any) => {
            if (v.name == '调度系统') {
              window.sessionStorage.setItem("userRole", window.btoa(window.encodeURIComponent(JSON.stringify(userRole))));
            }
          })

      }
    }
</script>
