import mitt from 'mitt'

type Events = {
  call: string
}

export const emitter = mitt<Events>()
