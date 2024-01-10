import mitt from 'mitt'

type Events = {
  call: string
  Nprogress: boolean
}

export const emitter = mitt<Events>()
