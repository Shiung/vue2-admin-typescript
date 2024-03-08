import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
import testMockFn from './module/test'

import authMockFn from './module/auth'
import ordersMockFn from './module/orders'

console.log('createProdMockServer ******')
export async function setupProdMockServer() {
  // const mockModules = [...roleMock, ...userMockFn()]
  const mockModules = [...authMockFn(), ...ordersMockFn(), ...testMockFn()]
  createProdMockServer(mockModules)
}
