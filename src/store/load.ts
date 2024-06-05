import { defineStore } from 'pinia'
interface StateType {
  spinState: boolean
}
interface ActionsType {
  resetState: () => void
}
export const loadStore = defineStore<string, StateType, any, ActionsType>({
  id: 'loadStore',
  state: () => ({
    spinState: false //服务加载期间等待动画
  }),
  actions: {
    resetState() {
      this.spinState = false
    }
  },
  persist: {
    storage: sessionStorage,
    paths: ['spinState']
  }
})
