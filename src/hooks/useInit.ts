import { ref, watch } from 'vue'
import { useUserStoreHook } from '@/stores/user'
import useNav from './useNav'

import API from '@/api'

const useInit = () => {
  const { token, operator, info, SET_LOGIN } = useUserStoreHook()
  const { route } = useNav()
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
          throw res
        }
        const roleId = res.data[0].id
        SET_LOGIN({ token, operator, info: { ...info, roleId: roleId } })
        const res2 = await API.PermissionManageRoleGroupGet(String(roleId))
        if (res2.code !== 0) {
          throw res2
        }
      } catch (e) {
        console.log('e', e)
      }
    }
    setTimeout(() => (isInit.value = true), 100)
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
