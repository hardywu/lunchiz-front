import {
  CREATE_RESTAURANT, CREATE_RESTAURANT_SUCCED, CREATE_RESTAURANT_FAILED,
  FETCH_RESTAURANT, FETCH_RESTAURANT_SUCCED, FETCH_RESTAURANT_FAILED,
  FETCH_RESTAURANT_LIST, FETCH_RESTAURANT_LIST_SUCCED,
  FETCH_RESTAURANT_LIST_FAILED,
} from '../actions';

export const initState = {
  restaurantList: null,
  restaurant: null,
  createLoading: false,
  fetchListLoading: false,
  fetchLoading: false,
  createError: null,
  fetchError: null,
  restaurantListTotal: 0,
  fetchListError: null,
}

export default function reducer(state = initState, action) {
  switch (action.type) {
    case CREATE_RESTAURANT:
      return {
        ...state,
        createloading: true,
        createError: null,
      }
    case CREATE_RESTAURANT_SUCCED:
      return {
        ...state,
        createloading: false,
      }
    case CREATE_RESTAURANT_FAILED:
      return {
        ...state,
        createloading: false,
        createError: action.message,
      }
    case FETCH_RESTAURANT:
      return {
        ...state,
        fetchLoading: true,
        fetchError: null,
      }
    case FETCH_RESTAURANT_SUCCED:
      return {
        ...state,
        fetchLoading: false,
        restaurant: action.data,
      }
    case FETCH_RESTAURANT_FAILED:
      return {
        ...state,
        fetchLoading: false,
        fetchError: action.message,
      }
    case FETCH_RESTAURANT_LIST:
      return {
        ...state,
        fetchListLoading: true,
        fetchListError: null,
      }
    case FETCH_RESTAURANT_LIST_SUCCED:
      return {
        ...state,
        fetchListLoading: false,
        restaurantList: action.data,
        restaurantListTotal: action.meta.total,
      }
    case FETCH_RESTAURANT_LIST_FAILED:
      return {
        ...state,
        fetchListLoading: false,
        fetchListError: action.message,
      }
    default:
      return state;
  }
}
