import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
// import roleMock from '../mock/dep/role'
// import userMockFn from '../mock/user'
import testMockFn from './module/test'

console.log('createProdMockServer ******')
export async function setupProdMockServer() {
  // const mockModules = [...roleMock, ...userMockFn()]
  const mockModules = [...testMockFn()]
  createProdMockServer(mockModules)
}
