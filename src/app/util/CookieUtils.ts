import Cookies from "js-cookie"


export const getCookie = (cookiename:any) => {
  return Cookies.get(cookiename)
}
