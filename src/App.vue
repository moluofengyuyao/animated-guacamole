<template>
  <a-config-provider :locale="zhCN">
    <a-spin
      style="max-height: none"
      :spinning="useLoad.spinState"
      size="large"
      tip="加载中..."
    >
      <div class="app">
        <router-view></router-view>
      </div>
    </a-spin>
  </a-config-provider>
</template>

<script lang="ts" setup>
import zhCN from "ant-design-vue/es/locale/zh_CN";
import { loadStore } from '@/store'
const useLoad = loadStore()
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');

</script>
<style scoped lang="scss">
.app {
  width: 100vw;
  height: 100vh;
}
</style>
