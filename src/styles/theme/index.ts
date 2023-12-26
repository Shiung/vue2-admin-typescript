import { themesMap } from './config'
import { flattenObj } from '@utils/index'

const removeStyleIfExisted = (prefix: string) => {
  const styleElement = document.getElementById(prefix)
  if (styleElement) styleElement.remove()
}

const colorGenerrator = (colors: object, prefix: string) => {
  removeStyleIfExisted(prefix)
  const flattenColors = flattenObj(colors)
  const colorString = Object.entries(flattenColors)
    .reduce((sum, [key, val]) => {
      return sum.concat([`--${prefix}-${key}: ${val};`])
    }, [] as string[])
    .join('')

  const style = document.createElement('style')
  style.id = prefix
  style.innerHTML = `:root { ${colorString} } `
  document.getElementsByTagName('head')[0].appendChild(style)
}

export const setThemeVariable = () => {
  colorGenerrator(themesMap, 'luTheme')
}
