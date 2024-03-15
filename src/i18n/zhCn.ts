const zhCN: { [key in string]: any } = {
  nav: {
    homeTitle: '首頁',
    order: {
      manageTitle: '注單管理',
      listTitle: '注单查询',
      editResultTitle: '修改注单结果'
    },
    game: {
      manageTitle: '賽事管理',
      sportsMaintainTitle: '球种维护',
      leagueLimitTitle: '联赛限额'
    },
    user: {
      manageTitle: '玩家管理'
    },
    report: {
      listTitle: '盈亏报表'
    },
    account: {
      permissionTitle: '帐号权限',
      permissionManageTitle: '权限管理',
      manageTitle: '帐号管理'
    }
  },
  login: {
    account: '账号',
    accountPlaceholder: '輸入帐号',
    accountError: '账号输入错误，请确认后再试',
    password: '密码',
    passwordPlaceholder: '请输入六至十位数的英文和字母',
    passwordError: '密码输入错误，请确认后再试',
    changePsw: '修改密码',
    button: '登入'
  },
  logout: {
    button: '登出'
  },
  sport: {
    football: '足球',
    basketball: '籃球',
    tennis: '網球',
    baseball: '棒球'
  },
  order: {
    title: {
      orderId: '注单编号',
      userName: '会员',
      betTime: '投注时间',
      curGameTime: '当下赛事时间',
      createTime: '成立时间',
      payoutTime: '结算时间',
      betDetail: '投注内容',
      resultScore: '最终比分',
      userResult: '会员输赢',
      totalAnte: '投注金额',
      status: '状态',
      cancelReason: '取消原因',
      timePickLabel: '时间区间',
      sportPickLabel: '运动',
      leaguePickLabel: '联赛',
      gamePickLabel: '赛事',
      currencyPickLabel: '币种',
      betTypeLabel: '投注类型',
      userNameLabel: '会员名称',
      orderIdLabel: '注单号码'
    },
    cancelReason: {
      manual_canceled: '手动取消',
      goal_event: '得分取消',
      match_canceled: '赛事取消'
    },
    marketResult: {
      None: '',
      Winner: '贏',
      Loser: '输',
      WinHalf: '赢半',
      LoseHalf: '输半',
      Refund: '退款',
      Irrelevant: '取消'
    },
    matchType: {
      Prematch: '早盘',
      Inplay: '滚球'
    },
    betType: {
      single: '單注',
      parlay: '串關'
    }
  },
  game: {
    title: {
      sportsMaintain: '球种维护开关',
      regionPickLabel: '区域',
      leaguePickLabel: '联赛',
      leagueName: '联赛名称',
      minimumBet: '单注最低投注额',
      matchMaxBet: '单场最高投注额',
      maxPayout: '最高派彩额',
      option: '功能'
    }
  },
  button: {
    search: '查詢',
    cancel: '取消',
    confirm: '确认',
    edit: '编辑',
    reset: '重置'
  },
  unit: {
    multiple: '批量',
    single: '单笔'
  },
  error: {
    login: '栏位有问题'
  },
  timer: {
    range: {
      week: '最近一周',
      month: '最近一个月',
      oneQuarterYear: '最近三个月',
      halfYear: '最近半年'
    }
  }
}

export default zhCN
