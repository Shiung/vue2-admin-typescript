import mitt from 'mitt'

type Events = {
  call: string
  Nprogress: boolean
  navHeight: number
  requestError: { response: any; code: number; message: string }
}

export const emitter = mitt<Events>()
