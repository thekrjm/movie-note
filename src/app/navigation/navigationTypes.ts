export interface IUserInfo{
  nickname: string
  email: string
}

export interface INavItem{
  isLoggedIn : boolean
  onClickLogoutHandler :()=>void
  onClickModalSwitch: ()=>void
}