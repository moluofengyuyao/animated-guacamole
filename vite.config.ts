import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

import {
  createStyleImportPlugin,
  AndDesignVueResolve
} from 'vite-plugin-style-import'
import { viteStaticCopy } from 'vite-plugin-static-copy'
export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      output: {
        sourcemap: false // 生成源码映射
      }
    }
  },
  plugins: [
    vue(),
    Components({
      extensions: ['vue'],
      include: [/\.vue$/, /\.vue\?vue/],
      dts: 'src/components.d.ts',
      resolvers: [
        AntDesignVueResolver({
          importStyle: false,
          resolveIcons: true
        }),
      ]
    }),
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), 'src/assets/icons/svg')],
      symbolId: 'icon-[dir]-[name]',
      inject: 'body-last',
      customDomId: '__svg__icons__dom__'
    }),
    createStyleImportPlugin({
      resolves: [AndDesignVueResolve()]
    }),
    viteStaticCopy({
      targets: [{ src: 'static', dest: '' }]
    }),
  ],
  resolve: {
    alias: {
      '@': resolve('src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/styles/element/index.scss" as *;`
        //  @import '@/assets/styles/index.scss';
      },
      less: {
        javascriptEnabled: true
      }
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    // 是否开启 https
    open: true
  }
})