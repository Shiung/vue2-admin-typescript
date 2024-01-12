type TableTab = {
  title: string
  name: string
  content: string
}

interface State {
  editableTabsValue: string
  editableTabs: Array<TableTab>
  tabIndex: number
}

export type { TableTab, State }