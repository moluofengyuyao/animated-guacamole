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
import layout from '@/components/layout/index.vue'
const route = useRoute()
const key = computed(() => route.path)
document.getElementById('htmlTitle').innerText = '用户帮助中心'
</script>

<style lang="scss" scoped>
.index {
  height: 100%;
  width: 100%;
}
</style>