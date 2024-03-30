export interface IUserInfo {
  nickname: string
  email: string
}

export interface INavItem {
  userData?: IUserInfo
  onClickLogoutHandler: () => void
  onClickModalSwitch: () => void
}
