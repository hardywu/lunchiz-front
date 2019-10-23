import { all } from 'redux-saga/effects';
import authSaga from './auth';
import restaurantsSaga from './restaurants';

export default function* rootSaga() {
  yield all([
    authSaga(),
    restaurantsSaga(),
  ])
}
