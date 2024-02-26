export function debounce<T extends () => void>(fn: T, timeout = 0) {
  let timer: ReturnType<typeof setTimeout>
  return function (...args: any) {
    const context = null
    clearTimeout(timer)

    timer = setTimeout(() => {
      typeof fn === 'function' && fn.apply(context, args)
    }, timeout)
  }
}
