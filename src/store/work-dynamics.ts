/*
 * @Author: zhuangyating 2114380985@qq.com
 * @Date: 2024-05-13 17:19:03
 * @LastEditors: zhuangyating 2114380985@qq.com
 * @LastEditTime: 2024-05-21 11:32:19
 * @FilePath: \cth-ddgl-web\src\store\work-dynamics.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from 'pinia'
interface StateType {
    isAdminGroup: boolean,
    userInfo:any,
    navlist:any,
    staIfShowAddCourse:any
}
interface ActionsType {
    isNotOtherGroup: () => any,
    isCountryLev: () => any,
    isCensusOffice: () => any,
    isCountryCensusOffice: () => any,
    isCountryCensusOfficeTester: () => any,
    setNavlist: (navlist:any) => any,
    mutIfShowAddCourse: (bool:any) => any
}
export const workDynamicsStore = defineStore<string, StateType, any, ActionsType>({
  id: 'workDynamics',
  state: () => ({
    isAdminGroup: true, //超级组
    userInfo:decodeURIComponent(atob(sessionStorage.getItem('UserInfo'))),
    navlist:[],
    staIfShowAddCourse:false
  }),
  actions: {
    isNotOtherGroup() {
        let user = this.userInfo?this.userInfo:''
        let group = JSON.parse(user).group
        return this.isCountryCensusOffice() ? group && Array.isArray(group) && group[0] ? group[0].name !== '其他' : false : true
    },
    isCountryLev() {
        let user = this.userInfo?this.userInfo:''
        return (
            JSON.parse(user).user
            .simcode === '0'
        )
    },
    isCensusOffice() {
        let user = this.userInfo?this.userInfo:''
        let multiple_dep_type = JSON.parse(user).user.dep_type_origin.split(',')
        return multiple_dep_type.includes('0') || multiple_dep_type.includes('1')
    },
    isCountryCensusOffice() {
        return this.isCountryLev() && this.isCensusOffice() ? 1 : 0
    },
    isCountryCensusOfficeTester() {
        return this.isCountryLev() && this.isCensusOffice() ? 1 : 0
    },
    setNavlist(navlist){
      this.navlist = navlist
    },
    mutIfShowAddCourse(bool){
      this.staIfShowAddCourse = bool
    }
  },
  persist: {
    storage: sessionStorage,
    paths: []
  }
})
  
