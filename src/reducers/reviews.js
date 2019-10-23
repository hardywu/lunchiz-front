import {
  CREATE_REVIEW, CREATE_REVIEW_SUCCED, CREATE_REVIEW_FAILED,
  FETCH_REVIEW, FETCH_REVIEW_SUCCED, FETCH_REVIEW_FAILED,
  FETCH_REVIEW_LIST, FETCH_REVIEW_LIST_SUCCED,
  FETCH_REVIEW_LIST_FAILED,
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
        review: action.data,
      }
    case FETCH_REVIEW_FAILED:
      return {
        ...state,
        fetchLoading: false,
        fetchError: action.message,
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
