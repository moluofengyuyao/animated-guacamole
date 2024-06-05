import { defineStore } from 'pinia'
interface userInfoType {}
interface stateType {
  userInfo: userInfoType
  token: string
  isLogin: boolean
}
interface ActionsType {
  getUserInfo: (data: any) => void
  changeToken: (data: any) => void
  logout: () => void
}
export const userStore = defineStore< any, any, any>(
  'userStore',
  {
    state: () => ({
      userInfo: {
      }, //用户信息
      token: '',
      isLogin: false
    }),
    actions: {
      getUserInfo(data: any) {
        this.userInfo = data
      },
      changeToken(data: any) {
        this.token = data
        this.isLogin = true
      },
      logout() {
        this.token = ''
        this.isLogin = false
        this.userInfo = {}
      }
    },
    persist: {
      storage: sessionStorage,
      paths: ['userInfo','token','isLogin']
    }
  }
)
