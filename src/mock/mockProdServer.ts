import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
import testMockFn from './module/test'

import authMockFn from './module/auth'

console.log('createProdMockServer ******')
export async function setupProdMockServer() {
  // const mockModules = [...roleMock, ...userMockFn()]
  const mockModules = [...authMockFn(), ...testMockFn()]
  createProdMockServer(mockModules)
}
