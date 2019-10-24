import { all } from 'redux-saga/effects';
import authSaga from './auth';
import restaurantsSaga from './restaurants';
import reviewsSaga from './reviews';
import usersSaga from './users';

export default function* rootSaga() {
  yield all([
    authSaga(),
    restaurantsSaga(),
    reviewsSaga(),
    usersSaga(),
  ])
}
