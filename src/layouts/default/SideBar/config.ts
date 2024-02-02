type MenuUnit = {
  titleI18n: string
  iconCss: string
  iconEL?: any
  disabled?: boolean
  index: string
  children?: Array<Omit<MenuUnit, 'iconCss'>>
}

export type MenuList = Array<MenuUnit>

const menuConf: MenuList = [
  {
    titleI18n: 'nav-orderManage',
    iconCss: 'el-icon-custom',
    iconEL: () => import('@/assets/svg/sideBar/orderManage.svg'),
    index: 'orderManage',
    children: [
      {
        titleI18n: '著單查詢',
        index: '/test4'
      },
      {
        titleI18n: '修改注單',
        index: '/test5'
      }
    ]
  },
  {
    titleI18n: '賽事管理',
    iconCss: 'el-icon-custom',
    iconEL: () => import('@/assets/svg/sideBar/gameManage.svg'),
    index: '/test2/123',
    disabled: false
  },
  {
    titleI18n: '玩家管理',
    iconCss: 'el-icon-custom',
    iconEL: () => import('@/assets/svg/sideBar/memberManage.svg'),
    index: '/login',
    disabled: false
  },
  {
    titleI18n: '盈亏报表',
    iconCss: 'el-icon-custom',
    iconEL: () => import('@/assets/svg/sideBar/report.svg'),
    index: 'orderManage-2',
    disabled: true
  },
  {
    titleI18n: '帐号权限',
    iconCss: 'el-icon-custom',
    iconEL: () => import('@/assets/svg/sideBar/accountManage.svg'),
    index: '/',
    disabled: false
  }
]

export { menuConf }
