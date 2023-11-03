import type { MockMethod } from 'vite-plugin-mock'
import { Random } from 'mockjs'
import type { TestActionType } from '@/api/types'

export default () => {
  return [
    {
      url: '/products/1',
      method: 'get',
      response: (): TestActionType.TestFetch['res'] => {
        return {
          code: 0,
          message: 'ok',
          mockPath: {
            root: import.meta.url,
            path: '/products/1'
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
      url: '/products/add',
      method: 'post',
      response: (res: any): TestActionType.TestPost['res'] => {
        console.log('query>>>>>>>>add', res)
        return {
          code: 0,
          message: 'ok',
          mockPath: {
            root: import.meta.url,
            path: '/products/add'
          },
          data: { id: Random.integer(10, 50), title: Random.name() }
        }
      }
    }
  ] as MockMethod[]
}
