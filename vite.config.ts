import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import vue2 from '@vitejs/plugin-vue2'
import vue2Jsx from '@vitejs/plugin-vue2-jsx'
import { createHtmlPlugin } from 'vite-plugin-html'
import { execSync } from 'child_process'
import { viteMockServe } from 'vite-plugin-mock'
import svgLoader from 'vite-svg-loader'

import packageJson from './package.json'

const getGitCommit = () => {
  let returnStr
  try {
    returnStr = execSync('git rev-parse HEAD')?.toString() ?? 'none'
  } catch (error) {
    returnStr = 'no use git repo'
  }

  return returnStr
}

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env.app_version': JSON.stringify(packageJson.version)
  },
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
            { name: 'app_commitHEAD', content: getGitCommit() /* execSync('git rev-parse HEAD').toString() */ }
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
    }),
    svgLoader()
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
