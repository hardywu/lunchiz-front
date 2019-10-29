import { combineReducers } from 'redux';
import { default as authReducer, initState as authState } from './auth';
import {
  default as restaurantsReducer, initState as restaurantsState
} from './restaurants';
import {
  default as reviewsReducer, initState as reviewsState
} from './reviews';
import {
  default as usersReducer, initState as usersState
} from './users';
import { SHOW_ERROR_MSG, DISMISS_ERROR_MSG } from '../actions';

function errMsg(state = '', action) {
  switch (action.type) {
    case SHOW_ERROR_MSG:
      return action.msg;
    case DISMISS_ERROR_MSG:
      return ''
    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  auth: authReducer,
  restaurants: restaurantsReducer,
  reviews: reviewsReducer,
  users: usersReducer,
  errMsg,
});

export const initRootState = {
  auth: authState,
  restaurants: restaurantsState,
  reviews: reviewsState,
  users: usersState,
  errMsg: '',
};
