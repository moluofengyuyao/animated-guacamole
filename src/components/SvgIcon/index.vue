<template>
  <!-- 如果是iconClass是带协议的图标链接 则通过style属性方式渲染 -->
  <div
    v-if="isExt"
    :style="styleExternalIcon"
    class="svg-icon svg-external-icon"
    v-bind="$attrs"
  ></div>
  <!-- SVG icon 通过名称使用 -->
  <svg v-else :class="svgClass" aria-hidden="true" v-bind="$attrs">
    <!-- SVG中的元素可以调用其它SVG文件的元素 -->
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { isExternal } from '@/utils/validate'

const props = defineProps<{ iconClass: string; className?: string }>()

//是否是携带协议的图片链接
const isExt = computed(() => isExternal(props.iconClass || ''))
//拼接成symbolId在vite插件中指定了symbolI的格式 icon-图标名称
const iconName = computed(() => `#icon-${props.iconClass}`)

//添加类名 props.className外部传入自定义类名
const svgClass = computed(() =>
  props.className ? `svg-icon ${props.className}` : 'svg-icon'
)

//如果iconClass是自带协议的图标链接 则通过style css属性方式渲染
const styleExternalIcon = computed(() => ({
  mask: `url(${props.iconClass}) no-repeat 50% 50%`,
  '-webkit-mask': `url(${props.iconClass}) no-repeat 50% 50%`
}))
</script>

<style scoped>
.svg-icon {
  width: 1.5rem;
  height: 1.5rem;
  fill: currentColor;
  overflow: hidden;
  vertical-align: middle
}
.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
