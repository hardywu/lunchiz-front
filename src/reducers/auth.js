import {
  SIGN_IN, SIGN_IN_SUCCED, SIGN_IN_FAILED,
  SIGN_UP, SIGN_UP_SUCCED, SIGN_UP_FAILED,
  FETCH_ME, FETCH_ME_SUCCED, FETCH_ME_FAILED,
  SIGN_OUT,
} from '../actions';
import { isAuthenticated } from '../utils';

export const initState = {
  signedIn: isAuthenticated(),
  loading: false,
  user: null,
  signInError: null,
  signUpError: null,
}

export default function reducer(state = initState, action) {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        loading: true,
        signInError: null,
      }
    case SIGN_IN_SUCCED:
      return {
        ...state,
        loading: false,
        signedIn: true,
        signInError: null,
        user: action.data,
      }
    case SIGN_IN_FAILED:
      return {
        ...state,
        loading: false,
        signedIn: false,
        signInError: action.message,
      }
    case SIGN_UP:
      return {
        ...state,
        loading: true,
        signUpError: null,
      }
    case SIGN_UP_SUCCED:
      return {
        ...state,
        loading: false,
        signedIn: true,
        signUpError: null,
        user: action.data,
      }
    case SIGN_UP_FAILED:
      return {
        ...state,
        loading: false,
        signUpError: action.message,
      }
    case SIGN_OUT:
      return {
        ...state,
        signedIn: false,
        user: null,
      }
    case FETCH_ME:
      return {
        ...state,
        loading: true,
      }
    case FETCH_ME_SUCCED:
      return {
        ...state,
        loading: false,
        user: action.data,
      }
    case FETCH_ME_FAILED:
      return {
        ...state,
        loading: false,
        signedIn: false,
        user: null,
        signInError: action.message,
      }
    default:
      return state;
  }
}
