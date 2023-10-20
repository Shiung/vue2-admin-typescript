import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import vue2 from '@vitejs/plugin-vue2'
import vue2Jsx from '@vitejs/plugin-vue2-jsx'
import { createHtmlPlugin } from 'vite-plugin-html'
import { execSync } from 'child_process'

import packageJson from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue2(),
    vue2Jsx(),
    legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    }),
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
      '@core': fileURLToPath(new URL('./src/core', import.meta.url))
    }
  }
})
