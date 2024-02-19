export enum ThemeConf {
  'dark' = 'dark',
  'light' = 'light'
}

export const themesMap = {
  [ThemeConf.light]: {
    primary: '#007AfF',
    bg: {
      primary: '#fff'
    },
    sideBar: {
      bg: '#fff',
      textColor: 'rgba(0, 0, 0, .7)',
      activeTextColor: '#007AfF',
      bgHover: '#ecf5ff'
    }
  },
  [ThemeConf.dark]: {
    primary: '#444e5c',
    bg: {
      primary: '#444e5c'
    },
    sideBar: {
      bg: '#444e5c',
      textColor: 'rgba(0, 0, 0, .7)',
      activeTextColor: '#d6b887',
      bgHover: '#ecf5ff'
    }
  }
}
