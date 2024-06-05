<!--
 * @Author: zhuangyating 2114380985@qq.com
 * @Date: 2024-05-22 09:55:23
 * @LastEditors: zhuangyating 2114380985@qq.com
 * @LastEditTime: 2024-05-22 10:01:48
 * @FilePath: \cth-ddgl-web\src\views\index\work-dynamics\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="index">
    <Suspense>
      <template #default>
        <layout></layout>
      </template>
      <template #fallback>
        <div>layout加载错误</div>
      </template>
    </Suspense>

    <router-view v-slot="{ Component }">
      <Suspense>
        <template #default>
          <component :is="Component" :key="key" />
        </template>
        <template #fallback>
          <div>页面加载错误</div>
        </template>
      </Suspense>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import layout from '@/components/layout/work-dynamics/index.vue'
const route = useRoute()
const key = computed(() => route.path)
document.getElementById('htmlTitle').innerText = '常态工作管理'
</script>

<style lang="scss" scoped>
.index {
  height: 100%;
  width: 100%;
}
</style>