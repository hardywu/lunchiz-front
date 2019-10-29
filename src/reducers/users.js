import {
  UPDATE_USER, UPDATE_USER_SUCCED, UPDATE_USER_FAILED,
  DELETE_USER, DELETE_USER_SUCCED, DELETE_USER_FAILED,
  FETCH_USER, FETCH_USER_SUCCED, FETCH_USER_FAILED,
  FETCH_USER_LIST, FETCH_USER_LIST_SUCCED,
  FETCH_USER_LIST_FAILED,
} from '../actions';

export const initState = {
  idList: null,
  listTotal: 0,
  updateLoading: false,
  fetchListLoading: false,
  fetchLoading: false,
  updateError: null,
  fetchError: null,
  fetchListError: null,
}

export default function reducer(state = initState, action) {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        updateLoading: true,
        updateError: null,
      }
    case UPDATE_USER_SUCCED:
      return {
        ...state,
        updateLoading: false,
      }
    case UPDATE_USER_FAILED:
      return {
        ...state,
        updateLoading: false,
        updateError: action.message,
      }
    case DELETE_USER:
      return {
        ...state,
        deleteLoading: true,
        deleteError: null,
      }
    case DELETE_USER_SUCCED:
      return {
        ...state,
        deleteLoading: false,
        idList: state.idList.filter(id => id !== action.id),
      }
    case DELETE_USER_FAILED:
      return {
        ...state,
        deleteLoading: false,
        deleteError: action.message,
      }
    case FETCH_USER:
      return {
        ...state,
        fetchLoading: true,
        fetchError: null,
      }
    case FETCH_USER_SUCCED:
      return {
        ...state,
        fetchLoading: false,
      }
    case FETCH_USER_FAILED:
      return {
        ...state,
        fetchLoading: false,
        fetchError: action.message,
      }
    case FETCH_USER_LIST:
      return {
        ...state,
        fetchListLoading: true,
        fetchListError: null,
      }
    case FETCH_USER_LIST_SUCCED:
      return {
        ...state,
        fetchListLoading: false,
        idList: action.data,
        listTotal: action.meta.total,
      }
    case FETCH_USER_LIST_FAILED:
      return {
        ...state,
        fetchListLoading: false,
        fetchListError: action.message,
      }
    default:
      return state;
  }
}
