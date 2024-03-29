import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
import testMockFn from './module/test'

import authMockFn from './module/auth'
import ordersMockFn from './module/orders'
import gamesMockFn from './module/games'

console.log('createProdMockServer ******')
export async function setupProdMockServer() {
  // const mockModules = [...roleMock, ...userMockFn()]
  const mockModules = [...authMockFn(), ...ordersMockFn(), ...gamesMockFn(), ...testMockFn()]
  createProdMockServer(mockModules)
}
