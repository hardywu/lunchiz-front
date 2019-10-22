export const SIGN_IN = 'SIGN_IN'
export const SIGN_IN_SUCCED = 'SIGN_IN_SUCCED'
export const SIGN_IN_FAILED = 'SIGN_IN_FAILED'
export const SIGN_UP = 'SIGN_UP'
export const SIGN_UP_SUCCED = 'SIGN_UP_SUCCED'
export const SIGN_UP_FAILED = 'SIGN_UP_FAILED'
export const SIGN_OUT = 'SIGN_OUT'


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
  console.log('up', data)
  return { type: SIGN_UP_SUCCED, data }
}

export const failedSignUp = (message) => {
  return { type: SIGN_UP_FAILED, message }
}

export const signOut = () => {
  return { type: SIGN_OUT }
}
