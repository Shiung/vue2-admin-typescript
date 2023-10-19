import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

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
    NProgress.start()
  }

  done() {
    NProgress.done()
  }
}

export default new Progress()
