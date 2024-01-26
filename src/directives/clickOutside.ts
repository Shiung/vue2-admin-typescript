import type { Directive } from 'vue'

interface IHTMLElementClicketyClick extends HTMLElement {
  __clickOutsideHandler__(event: MouseEvent): void
}

export const clickOutside: Directive = {
  bind(el: IHTMLElementClicketyClick, binding: any) {
    const { fn } = binding?.value ?? {}
    el.__clickOutsideHandler__ = (event) => {
      if (el?.contains(event.target as HTMLElement)) {
        // clickOutside inside
      } else {
        // clickOutside outside
        typeof fn === 'function' && fn()
      }
    }
    document.addEventListener('click', el.__clickOutsideHandler__)
  },
  unbind(el: IHTMLElementClicketyClick) {
    document.removeEventListener('click', el.__clickOutsideHandler__)
  }
}
