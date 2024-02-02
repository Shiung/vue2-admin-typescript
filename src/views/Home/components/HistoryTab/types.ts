type TableTab = {
  title: string
  name: string
  content: string
  params?: { [key in string]: string }
}

interface State {
  editableTabsValue: string
  editableTabs: Array<TableTab>
  tabIndex: number
}

export type { TableTab, State }