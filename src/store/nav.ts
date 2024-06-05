import { defineStore } from 'pinia'
// import { name } from '../../package.json'

export const useNavStore = defineStore({
  id: `useNavStore`,
  state: () => ({
    activeName: '"docsdownload"',
    navList: [],
    activeModule: {}
  }),
  actions: {
    changeActiveName(routerName: string) {
      this.activeName = routerName
    },
    changeActiveModule(router: any) {
      this.activeModule = router
    }
  },
  persist: {
    storage: sessionStorage,
    paths: ['activeName']
  }
})