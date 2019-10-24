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

export const rootReducer = combineReducers({
  auth: authReducer,
  restaurants: restaurantsReducer,
  reviews: reviewsReducer,
  users: usersReducer,
});

export const initRootState = {
  auth: authState,
  restaurants: restaurantsState,
  reviews: reviewsState,
  users: usersState,
};
