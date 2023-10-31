const actionTestMapping = {
  TestFetch: { path: '/products/1', name: 'TestFetch' },
  TestPost: { path: '/products/add', name: 'TestPost' }
} as const

export { actionTestMapping }
