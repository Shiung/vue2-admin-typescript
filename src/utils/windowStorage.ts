type StorageKey = 'mock' | 'auth'

const getLocalStorage = (key: StorageKey) => {
  const res = localStorage.getItem(key)
  if (res && res !== '') {
    try {
      return JSON.parse(res)
    } catch (e) {
      return res
    }
  }
  return ''
}

const setLocalStorage = (key: StorageKey, val: any) => {
  localStorage.setItem(key, typeof val === 'string' ? val : JSON.stringify(val))
}

const removeLocalStorage = (key: StorageKey) => localStorage.removeItem(key)

export { getLocalStorage, setLocalStorage, removeLocalStorage }
