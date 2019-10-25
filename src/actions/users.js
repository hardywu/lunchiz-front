export const UPDATE_USER = 'UPDATE_USER'
export const UPDATE_USER_SUCCED = 'UPDATE_USER_SUCCED'
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED'
export const FETCH_USER_LIST = 'FETCH_USER_LIST'
export const FETCH_USER_LIST_SUCCED = 'FETCH_USER_LIST_SUCCED'
export const FETCH_USER_LIST_FAILED = 'FETCH_USER_LIST_FAILED'
export const FETCH_USER = 'FETCH_USER'
export const FETCH_USER_SUCCED = 'FETCH_USER_SUCCED'
export const FETCH_USER_FAILED = 'FETCH_USER_FAILED'
export const DELETE_USER = 'DELETE_USER'
export const DELETE_USER_SUCCED = 'DELETE_USER_SUCCED'
export const DELETE_USER_FAILED = 'DELETE_USER_FAILED'

export const doUpdateUser = (id, data, successCB, errorCB) => {
  return { type: UPDATE_USER, id, data, successCB, errorCB }
}

export const succedUpdateUser = (data) => {
  return { type: UPDATE_USER_SUCCED, data }
}

export const failedUpdateUser = (message) => {
  return { type: UPDATE_USER_FAILED, message }
}

export const doFetchUserList = (params) => {
  return { type: FETCH_USER_LIST, params }
}

export const succedFetchUserList = (data, meta) => {
  return { type: FETCH_USER_LIST_SUCCED, data, meta }
}

export const failedFetchUserList = (message) => {
  return { type: FETCH_USER_LIST_FAILED, message }
}

export const doFetchUser = (id) => {
  return { type: FETCH_USER, id }
}

export const succedFetchUser = (data) => {
  return { type: FETCH_USER_SUCCED, data }
}

export const failedFetchUser = (message) => {
  return { type: FETCH_USER_FAILED, message }
}

export const doDeleteUser = (id) => {
  return { type: DELETE_USER, id }
}

export const succedDeleteUser = (id) => {
  return { type: DELETE_USER_SUCCED, id }
}

export const failedDeleteUser = (message) => {
  return { type: DELETE_USER_FAILED, message }
}
