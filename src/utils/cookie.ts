import Cookies from "js-cookie"


export const getCookie = (cookiename:string) => {
  return Cookies.get(cookiename)
}

// accessToken이 쿠키에 존재하는지 여부 전달
export const existAccessTokenCookie = (): boolean => {
  if (!Cookies.get('accessToken')) {
    return false
  }
  return true
}