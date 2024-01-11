import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createHtmlPlugin } from 'vite-plugin-html'
import { execSync } from 'child_process'
import { viteMockServe } from 'vite-plugin-mock'

import packageJson from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    createHtmlPlugin({
      inject: {
        data: {
          title: packageJson.name,
          meta: [
            { name: 'app_version', content: packageJson.version },
            { name: 'app_commitHEAD', content: execSync('git rev-parse HEAD').toString() }
          ]
        }
      }
    }),
    // https://github.com/vbenjs/vite-plugin-mock
    viteMockServe({
      mockPath: 'mock',
      watchFiles: true,
      logger: true
      // injectCode: `
      //   import { setupProdMockServer } from './mockProdServer';
      //   setupProdMockServer();
      // `
    })
  ],
  server: {
    // 是否开启 https
    https: false,
    // 端口号
    host: '0.0.0.0',
    // 本地跨域代理 https://cn.vitejs.dev/config/server-options.html#server-proxy
    proxy: {}
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@core': fileURLToPath(new URL('./src/core', import.meta.url)),
      '@views': fileURLToPath(new URL('./src/views', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
      '@layouts': fileURLToPath(new URL('./src/layouts', import.meta.url))
    }
  }
})
