import Cookies from 'js-cookie'

const TokenKey = 'token'

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
    
}

export const getRedirectLogin = () => {
    return Cookies.get('redirect_login')
}

export const clearCookies = () => {
    const cookieNames = Object.keys(Cookies.get())
    cookieNames.forEach((cookieName) => {
        Cookies.remove(cookieName)
    })
}
