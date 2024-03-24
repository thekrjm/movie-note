import Cookies from "js-cookie"


export const getCookie = (cookiename:string) => {
  return Cookies.get(cookiename)
}
