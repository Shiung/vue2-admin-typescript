import { ref, watch } from 'vue'
import { useUserStoreHook } from '@/stores/user'
import useNav from './useNav'
import { Message } from 'element-ui'

import API from '@/api'

const useInit = () => {
  const { token, operator, info, SET_LOGIN, SET_LOOUT } = useUserStoreHook()
  const { route, router } = useNav()
  const isInit = ref<boolean>(false)
  const isRouteDone = ref<boolean>(false)

  const initialHandler = async () => {
    const isNeedPermissionCheck = route.meta?.requiresAuth ?? false

    if (route.name === 'login' || !isNeedPermissionCheck) {
      // without 權限認證
    } else {
      // 權限認證
      try {
        const res = await API.PermissionManageGet()
        if (res.code !== 0) {
          throw { response: { data: { code: res.code, message: res.message } } }
        }
        const roleId = res.data[0].id
        SET_LOGIN({ token, operator, info: { ...info, roleId: roleId } })
        const res2 = await API.PermissionManageRoleGroupGet(String(roleId))
        if (res2.code !== 0) {
          throw { response: { data: { code: res2.code, message: res2.message } } }
        }
      } catch (e) {
        if (typeof e === 'string') Message({ type: 'error', message: e, duration: 5000 })
        const { response } = e as { response: { data: { code: string; message: string } } }
        Message({
          type: 'error',
          message: response?.data?.code ?? 'error',
          duration: 5000
        })
        if (Number(response.data.code) === 10403) {
          SET_LOOUT()
          router.push({ name: 'login' })
        }
      }
    }
    isInit.value = true
  }

  watch(
    () => route.name,
    (name) => {
      if (isRouteDone.value) return

      if (name !== null) {
        isRouteDone.value = true
        initialHandler()
      }
    },
    { immediate: true }
  )

  return { isInit }
}

export default useInit
