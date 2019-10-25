export const CREATE_RESTAURANT = 'CREATE_RESTAURANT'
export const CREATE_RESTAURANT_SUCCED = 'CREATE_RESTAURANT_SUCCED'
export const CREATE_RESTAURANT_FAILED = 'CREATE_RESTAURANT_FAILED'
export const UPDATE_RESTAURANT = 'UPDATE_RESTAURANT'
export const UPDATE_RESTAURANT_SUCCED = 'UPDATE_RESTAURANT_SUCCED'
export const UPDATE_RESTAURANT_FAILED = 'UPDATE_RESTAURANT_FAILED'
export const DELETE_RESTAURANT = 'DELETE_RESTAURANT'
export const DELETE_RESTAURANT_SUCCED = 'DELETE_RESTAURANT_SUCCED'
export const DELETE_RESTAURANT_FAILED = 'DELETE_RESTAURANT_FAILED'
export const FETCH_RESTAURANT_LIST = 'FETCH_RESTAURANT_LIST'
export const FETCH_RESTAURANT_LIST_SUCCED = 'FETCH_RESTAURANT_LIST_SUCCED'
export const FETCH_RESTAURANT_LIST_FAILED = 'FETCH_RESTAURANT_LIST_FAILED'
export const FETCH_RESTAURANT = 'FETCH_RESTAURANT'
export const FETCH_RESTAURANT_SUCCED = 'FETCH_RESTAURANT_SUCCED'
export const FETCH_RESTAURANT_FAILED = 'FETCH_RESTAURANT_FAILED'

export const doCreateRestaurant = (data, successCB, errorCB) => {
  return { type: CREATE_RESTAURANT, data, successCB, errorCB }
}

export const succedCreateRestaurant = (data) => {
  return { type: CREATE_RESTAURANT_SUCCED, data }
}

export const failedCreateRestaurant = (message) => {
  return { type: CREATE_RESTAURANT_FAILED, message }
}

export const doUpdateRestaurant = (id, data, successCB, errorCB) => {
  return { type: UPDATE_RESTAURANT, id, data, successCB, errorCB }
}

export const succedUpdateRestaurant = (data) => {
  return { type: UPDATE_RESTAURANT_SUCCED, data }
}

export const failedUpdateRestaurant = (message) => {
  return { type: UPDATE_RESTAURANT_FAILED, message }
}

export const doDeleteRestaurant = (id) => {
  return { type: DELETE_RESTAURANT, id }
}

export const succedDeleteRestaurant = (id) => {
  return { type: DELETE_RESTAURANT_SUCCED, id }
}

export const failedDeleteRestaurant = (message) => {
  return { type: DELETE_RESTAURANT_FAILED, message }
}

export const doFetchRestaurantList = (params) => {
  return { type: FETCH_RESTAURANT_LIST, params }
}

export const succedFetchRestaurantList = (data, meta) => {
  return { type: FETCH_RESTAURANT_LIST_SUCCED, data, meta }
}

export const failedFetchRestaurantList = (message) => {
  return { type: FETCH_RESTAURANT_LIST_FAILED, message }
}

export const doFetchRestaurant = (id) => {
  return { type: FETCH_RESTAURANT, id }
}

export const succedFetchRestaurant = (data) => {
  return { type: FETCH_RESTAURANT_SUCCED, data }
}

export const failedFetchRestaurant = (message) => {
  return { type: FETCH_RESTAURANT_FAILED, message }
}
