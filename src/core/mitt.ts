import mitt from 'mitt'

type Events = {
  call: string
  Nprogress: boolean
  navHeight: number
}

export const emitter = mitt<Events>()
