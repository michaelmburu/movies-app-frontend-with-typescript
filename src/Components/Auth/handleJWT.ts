import { AuthenticationResponseDTO, Claim } from './Auth.Model'

const tokenKey = 'token'
const expirationKey: string = 'token-expiration'

export const saveToken = (authData: AuthenticationResponseDTO) => {
  localStorage.setItem(tokenKey, authData.token)
  localStorage.setItem(expirationKey, authData.expiration.toString())
}

export const getClaims = (): Claim[] => {
  const token = localStorage.getItem(tokenKey)
  if (!token) {
    return []
  }

  const expiration = localStorage.getItem(expirationKey)!
  let expirationDate = new Date()
  if (expiration) {
    expirationDate = new Date(expiration)
    if (expirationDate <= new Date()) {
      logout()
      return []
    }
  } else {
    return []
  }

  const dataToken = JSON.parse(atob(token.split('.')[1]))
  const response: Claim[] = []

  for (const property in dataToken) {
    response.push({ name: property, value: dataToken[property] })
  }

  return response
}

export const logout = () => {
  localStorage.removeItem(tokenKey)
  localStorage.removeItem(expirationKey)
}

export const getToken = () => {
  return localStorage.getItem(tokenKey)
}
