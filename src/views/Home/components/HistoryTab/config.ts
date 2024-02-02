import type { TableTab } from './types'

const tabConf: { [key in string]: TableTab } = {
  home: { title: '首頁', name: 'home', content: 'this is content home' },
  test2: { title: 'test2test2 test2 test2test2 test2 test2test2 test2 test2test2 test2', name: 'test2', content: 'this is content test2' },
  test3: { title: 'test3', name: 'test3', content: 'this is content test3' },
  test4: { title: 'test4 test', name: 'test4', content: 'this is content test4' },
  test5: { title: 'test5 title', name: 'test5Home', content: 'this is content test5' },
  test5In: { title: 'test5In title', name: 'test5In', content: 'this is content test5', params: { id: 'jack' } }
}

export { tabConf }
