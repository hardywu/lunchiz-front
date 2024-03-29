export const SIGN_IN = 'SIGN_IN'
export const SIGN_IN_SUCCED = 'SIGN_IN_SUCCED'
export const SIGN_IN_FAILED = 'SIGN_IN_FAILED'
export const SIGN_UP = 'SIGN_UP'
export const SIGN_UP_SUCCED = 'SIGN_UP_SUCCED'
export const SIGN_UP_FAILED = 'SIGN_UP_FAILED'
export const SIGN_OUT = 'SIGN_OUT'
export const FETCH_ME = 'FETCH_ME'
export const FETCH_ME_SUCCED = 'FETCH_ME_SUCCED'
export const FETCH_ME_FAILED = 'FETCH_ME_FAILED'

export const doSignIn = (payload) => {
  return { type: SIGN_IN, payload }
}

export const succedSignIn = (data) => {
  return { type: SIGN_IN_SUCCED, data }
}

export const failedSignIn = (message) => {
  return { type: SIGN_IN_FAILED, message }
}

export const doSignUp = (payload) => {
  return { type: SIGN_UP, payload }
}

export const succedSignUp = (data) => {
  return { type: SIGN_UP_SUCCED, data }
}

export const failedSignUp = (message) => {
  return { type: SIGN_UP_FAILED, message }
}

export const signOut = () => {
  return { type: SIGN_OUT }
}

export const doFetchMe = () => {
  return { type: FETCH_ME }
}

export const succedFetchMe = (data) => {
  return { type: FETCH_ME_SUCCED, data }
}

export const failedFetchMe = (message) => {
  return { type: FETCH_ME_FAILED, message }
}
