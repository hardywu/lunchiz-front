import { combineReducers } from 'redux';
import {
  default as authReducer,
  initState as authState
} from './auth';
import {
  default as restaurantsReducer,
  initState as restaurantsState
} from './restaurants';

export const rootReducer = combineReducers({
  auth: authReducer,
  restaurants: restaurantsReducer,
});

export const initRootState = {
  auth: authState,
  restaurants: restaurantsState,
};
