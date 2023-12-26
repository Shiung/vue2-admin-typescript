const __recursive = (inKey: string, inVal: any) => {
  if (!(typeof inVal === 'object' && !Array.isArray(inVal))) return { [inKey]: inVal }
  let combindObj = {}
  for (const i in inVal) {
    const returnObj = __recursive(`${inKey}-${i}`, inVal[i])
    if (returnObj) {
      combindObj = {
        ...combindObj,
        ...returnObj
      }
    }
  }
  return {
    ...combindObj
  }
}

export const flattenObj = (obj: object) => {
  if (typeof obj !== 'object') return {}
  return Object.entries(obj).reduce((sum, [key, val]) => {
    return {
      ...sum,
      ...__recursive(key, val)
    }
  }, {})
}