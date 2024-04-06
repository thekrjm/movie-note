export interface INavUserInfo {
  nickname: string
  email: string
}

export interface INavItem {
  userData?: INavUserInfo
  onClickLogoutHandler: () => void
  onClickModalSwitch: () => void
}
