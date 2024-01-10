import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { emitter } from '@core/mitt'

type ProgressOptions = Partial<NProgress.NProgressOptions>

class Progress {
  private options: ProgressOptions = { showSpinner: false }
  constructor(ops?: ProgressOptions) {
    this.register(ops)
  }

  private init() {
    NProgress.configure(this.options)
  }

  register(ops?: ProgressOptions) {
    !!ops && Object.keys(ops).length !== 0 && Object.assign(this.options, ops)
    this.init()
  }

  start() {
    emitter.emit('Nprogress', true)
    NProgress.start()
  }

  done() {
    emitter.emit('Nprogress', false)
    NProgress.done()
  }
}

export default new Progress()
