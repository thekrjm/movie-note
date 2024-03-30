import { atom, selector } from 'recoil'
import { IUserInfo } from '../navigation/navItemTypes'

export const logginedUserState = atom({
  key: 'logginedUserState',
  default: null as IUserInfo | null,
})

export const isLoggedInState = selector({
  key: 'isLoggedInState',
  get: ({ get }) => {
    const userState = get(logginedUserState)
    if (userState === null) {
      return false
    }
    return true
  },
})
