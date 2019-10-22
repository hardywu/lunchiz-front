import { combineReducers } from 'redux';
import {
  default as authReducer,
  initState as authState
} from './auth';

export const rootReducer = combineReducers({
  auth: authReducer,
});

export const initRootState = {
  auth: authState,
};
