import {
  CREATE_REVIEW, CREATE_REVIEW_SUCCED, CREATE_REVIEW_FAILED,
  FETCH_REVIEW, FETCH_REVIEW_SUCCED, FETCH_REVIEW_FAILED,
  FETCH_REVIEW_LIST, FETCH_REVIEW_LIST_SUCCED,
  FETCH_MY_REVIEW, FETCH_MY_REVIEW_SUCCED, FETCH_MY_REVIEW_FAILED,
  FETCH_REVIEW_LIST_FAILED,
} from '../actions';

export const initState = {
  idList: null,
  createLoading: false,
  fetchListLoading: false,
  fetchLoading: false,
  fetchMineLoading: false,
  createError: null,
  fetchError: null,
  fetchMineError: null,
  listTotal: 0,
  fetchListError: null,
}

export default function reducer(state = initState, action) {
  switch (action.type) {
    case CREATE_REVIEW:
      return {
        ...state,
        createloading: true,
        createError: null,
      }
    case CREATE_REVIEW_SUCCED:
      return {
        ...state,
        createloading: false,
      }
    case CREATE_REVIEW_FAILED:
      return {
        ...state,
        createloading: false,
        createError: action.message,
      }
    case FETCH_REVIEW:
      return {
        ...state,
        fetchLoading: true,
        fetchError: null,
      }
    case FETCH_REVIEW_SUCCED:
      return {
        ...state,
        fetchLoading: false,
      }
    case FETCH_REVIEW_FAILED:
      return {
        ...state,
        fetchLoading: false,
        fetchError: action.message,
      }
    case FETCH_MY_REVIEW:
      return {
        ...state,
        fetchMineLoading: true,
        fetchMineError: null,
      }
    case FETCH_MY_REVIEW_SUCCED:
      return {
        ...state,
        fetchMineLoading: false,
      }
    case FETCH_MY_REVIEW_FAILED:
      return {
        ...state,
        fetchMineLoading: false,
        fetchMineError: action.message,
      }
    case FETCH_REVIEW_LIST:
      return {
        ...state,
        fetchListLoading: true,
        fetchListError: null,
      }
    case FETCH_REVIEW_LIST_SUCCED:
      return {
        ...state,
        fetchListLoading: false,
        idList: action.data,
        listTotal: action.meta.total,
      }
    case FETCH_REVIEW_LIST_FAILED:
      return {
        ...state,
        fetchListLoading: false,
        fetchListError: action.message,
      }
    default:
      return state;
  }
}
