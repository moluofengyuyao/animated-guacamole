<template>
    <div class='onLineAnswer'>
      <WujieVue  
        width="100%"  
        height="100%" 
        :url='url' 
        :props="props"
        :alive="true"
      />
      <!-- <iframe
        :src='src'
        width="100%"
        height="100%"
        style="border: none"
      >
      </iframe> -->
    </div>
</template>
<script setup lang='ts'>
import { reactive, ref, nextTick, watch, onMounted } from 'vue'
import { userStore ,loadStore } from '@/store'
import WujieVue from "wujie-vue3";
const { setupApp, preloadApp, bus } = WujieVue;

const user = userStore()
const UserInfo = user.userInfo

const props = ref({
 name: btoa(encodeURIComponent('ltx')),
//  name: btoa(encodeURIComponent(UserInfo.user.simcode)),
 isadmin : UserInfo.user.simcode == '0'
})
const url = `https://xtgc.geo-compass.com/cth_web/ddgl/community/#/collection`
console.log(url);
setupApp({
  name: "onLineAnswer",
  sync:true,
  exec: true,
  beforeLoad: (appWindow) => console.log(`${appWindow.__WUJIE.id} beforeLoad 生命周期`),
  beforeMount: (appWindow) =>{ console.log(`${appWindow.__WUJIE.id} beforeMount 生命周期`)
  },
  afterMount: (appWindow) => console.log(`${appWindow.__WUJIE.id} afterMount 生命周期`),
  beforeUnmount: (appWindow) => console.log(`${appWindow.__WUJIE.id} beforeUnmount 生命周期`),
  afterUnmount: (appWindow) => console.log(`${appWindow.__WUJIE.id} afterUnmount 生命周期`),
  activated: (appWindow) => { console.log(`${appWindow.__WUJIE.id} activated 生命周期`)
  },
  deactivated: (appWindow) => {console.log(`${appWindow.__WUJIE.id} deactivated 生命周期`)
  },
  loadError: (url, e) => console.log(`${url} 加载失败`, e),
});
// decodeURIComponent(atob('JUU2JUIyJUIzJUU1JThDJTk3JUU3JTlDJTgxJUU1JUJBJTk0JUU2JTgwJUE1JUU5JTgzJUE4JUU5JTk3JUE4'))//解码

</script>
<style lang="scss" scoped>

.onLineAnswer {
  background: var(--main-bg-color);
  height: calc(100vh - 80px);
  width: 100%;
    overflow: auto;
  // overflow: hidden;
}
@media only screen and (max-width: 1366px) {
  .onLineAnswer {
    height:calc(100% - 60px);
  }
}
</style>
