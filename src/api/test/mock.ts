import type { MockMethod } from 'vite-plugin-mock'
import { Random } from 'mockjs'
import { actionTestMapping } from './index'
import type { TestFetch, TestPost } from './type'

export default () => {
  return [
    {
      url: actionTestMapping.TestFetch.path,
      method: 'get',
      response: ({ query }: { query: TestFetch['req'] }): TestFetch['res'] => {
        console.log('query>>>>>>>> get', query)
        return {
          code: 0,
          message: 'ok',
          mockPath: {
            root: import.meta.url,
            path: actionTestMapping.TestFetch.path
          },
          data: {
            id: Random.integer(10, 50),
            title: Random.name()
          }
        }
      },
      // timeout: 2000
    },
    {
      url: actionTestMapping.TestPost.path,
      method: 'post',
      response: (res: any): TestPost['res'] => {
        console.log('query>>>>>>>>add', res)
        return {
          code: 0,
          message: 'ok',
          mockPath: {
            root: import.meta.url,
            path: actionTestMapping.TestPost.path
          },
          data: { id: Random.integer(10, 50), title: Random.name() }
        }
      }
    }
  ] as MockMethod[]
}
