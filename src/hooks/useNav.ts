import { useRoute, useRouter } from 'vue-router/composables'

const useNav = () => {
  const route = useRoute()
  const router = useRouter()

  return {
    route,
    router
  }
}

export default useNav
