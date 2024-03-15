// mock path 會有match 相對比對問題
// ex: 1. /aaa/bbb  與 2. /aaa/bbb/ccc  發二的api 會抓到第一個出口的response

// ** import note **
// api 如果有動態變數需要加入path請用 .../:id 的方式

const apiPathMap = {
  login: {
    path: '/auth/login',
    mockPath: '/auth/login'
  },
  userRoleGroup: {
    path: '/permission-management/role-group',
    mockPath: '/permission-management/role-group'
  },
  userRoleGroupPermission: {
    path: '/permission-management/role-group/:id/permission',
    mockPath: '/permission-management/permission'
  },

  // orders
  ordersGet: {
    path: '/orders/page',
    mockPath: '/orders/page'
  },
  TournamentByDateRangeGet: {
    path: '/list/tournamentByDateRange',
    mockPath: '/list/tournamentByDateRange'
  },
  MatchByDateRangeGet: {
    path: '/list/matchByDateRange',
    mockPath: '/list/matchByDateRange'
  },

  // game
  SportSwitchGet: {
    path: '/game-management/sport-switch',
    mockPath: '/game-management/sport-switch-get'
  },
  SportSwitchPut: {
    path: '/game-management/sport-switch',
    mockPath: '/game-management/sport-switch-put'
  },
  SportCidListGet: {
    path: '/game-management/cid-list',
    mockPath: '/game-management/cid-list'
  },
  SportTidListGet: {
    path: '/game-management/tid-list',
    mockPath: '/game-management/tid-list'
  },
  SportLeagueLimitGet: {
    path: '/game-management/limit',
    mockPath: '/game-management/limit-get'
  },
  SportLeagueLimitPut: {
    path: '/game-management/limit',
    mockPath: '/game-management/limit-put'
  }
}

export { apiPathMap }
