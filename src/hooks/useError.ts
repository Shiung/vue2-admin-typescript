import { onMounted, onUnmounted } from 'vue'
import useNav from './useNav'
import { Message } from 'element-ui'
import { emitter } from '@core/mitt'

import { useUserStoreHook } from '@/stores/user'

const useRequestError = () => {
  const { router } = useNav()
  const { SET_LOOUT } = useUserStoreHook()

  const logoutHandler = () => {
    SET_LOOUT()
    router.push({ name: 'login' })
  }

  onMounted(() => {
    emitter.on('requestError', ({ code, message }) => {
      if (code === 10403) {
        logoutHandler()
      }
      Message({
        type: 'error',
        message: `[${code}] ${message}`,
        duration: 5000
      })
    })
  })

  onUnmounted(() => {
    emitter.off('requestError')
  })
}

export { useRequestError }
