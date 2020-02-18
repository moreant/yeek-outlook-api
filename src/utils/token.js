import Cookies from 'js-cookie'

const tokenKey = 'access_token'

export function getToken () {
  return Cookies.get(tokenKey)
}

export function setToken (token) {
  return Cookies.set(tokenKey, token, { expires: 7 })
}

export function removeToken () {
  return Cookies.remove(tokenKey)
}
