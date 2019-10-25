import {
  CREATE_RESTAURANT, CREATE_RESTAURANT_SUCCED, CREATE_RESTAURANT_FAILED,
  FETCH_RESTAURANT, FETCH_RESTAURANT_SUCCED, FETCH_RESTAURANT_FAILED,
  DELETE_RESTAURANT, DELETE_RESTAURANT_SUCCED, DELETE_RESTAURANT_FAILED,
  UPDATE_RESTAURANT, UPDATE_RESTAURANT_SUCCED, UPDATE_RESTAURANT_FAILED,
  FETCH_RESTAURANT_LIST, FETCH_RESTAURANT_LIST_SUCCED,
  FETCH_RESTAURANT_LIST_FAILED,
} from '../actions';

export const initState = {
  idList: null,
  createLoading: false,
  fetchListLoading: false,
  fetchLoading: false,
  createError: null,
  fetchError: null,
  listTotal: 0,
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
    case DELETE_RESTAURANT:
      return {
        ...state,
        deleteLoading: true,
        deleteError: null,
      }
    case DELETE_RESTAURANT_SUCCED:
      return {
        ...state,
        deleteLoading: false,
      }
    case DELETE_RESTAURANT_FAILED:
      return {
        ...state,
        deleteLoading: false,
        deleteError: action.message,
      }
    case UPDATE_RESTAURANT:
      return {
        ...state,
        updateLoading: true,
        updateError: null,
      }
    case UPDATE_RESTAURANT_SUCCED:
      return {
        ...state,
        updateLoading: false,
      }
    case UPDATE_RESTAURANT_FAILED:
      return {
        ...state,
        updateLoading: false,
        updateError: action.message,
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
        idList: action.data,
        listTotal: action.meta.total,
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
