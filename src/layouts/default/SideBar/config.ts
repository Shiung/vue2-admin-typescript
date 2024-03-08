type MenuUnit = {
  titleI18n: string
  iconCss: string
  iconEL?: any
  disabled?: boolean
  index: string // router name
  children?: Array<Omit<MenuUnit, 'iconCss'>>
}

export type MenuList = Array<MenuUnit>

const menuConf: MenuList = [
  {
    titleI18n: 'nav-order-manageTitle',
    iconCss: 'el-icon-custom',
    iconEL: () => import('@/assets/svg/sideBar/orderManage.svg'),
    index: 'orderManage',
    children: [
      {
        titleI18n: 'nav-order-listTitle',
        index: 'betOrders'
      },
      {
        titleI18n: 'nav-order-editResultTitle',
        index: 'test5',
        disabled: true
      }
    ]
  },
  {
    titleI18n: 'nav-game-manageTitle',
    iconCss: 'el-icon-custom',
    iconEL: () => import('@/assets/svg/sideBar/gameManage.svg'),
    index: '/test2/123',
    disabled: true
  },
  {
    titleI18n: 'nav-user-manageTitle',
    iconCss: 'el-icon-custom',
    iconEL: () => import('@/assets/svg/sideBar/memberManage.svg'),
    index: 'test2',
    disabled: true
  },
  {
    titleI18n: 'nav-report-listTitle',
    iconCss: 'el-icon-custom',
    iconEL: () => import('@/assets/svg/sideBar/report.svg'),
    index: 'login',
    disabled: true
  },
  {
    titleI18n: 'nav-account-permissionTitle',
    iconCss: 'el-icon-custom',
    iconEL: () => import('@/assets/svg/sideBar/accountManage.svg'),
    index: 'account',
    children: [
      {
        titleI18n: 'nav-account-permissionManageTitle',
        index: 'account-permission'
      },
      {
        titleI18n: 'nav-account-manageTitle',
        index: 'home',
        disabled: true
      }
    ],
    disabled: false
  }
]

export { menuConf }
