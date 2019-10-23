import {
  call, put, takeLeading, all,
} from 'redux-saga/effects'
import * as actions from '../actions';
import { apiService, parseJsonApi, recordId, globalRecords } from '../utils';

function* createRestaurant({ data: { name } }) {
  try {
    const { data } = yield call(apiService.request, {
      url: '/stores',
      method: 'post',
      data: { name },
    });
    yield put(actions.succedCreateRestaurant(data))
  } catch (e) {
    yield put(actions.failedCreateRestaurant('err'))
  }
}

function* fetchRestaurant({ id }) {
  try {
    const { data } = yield call(apiService.request, {
      url: `/stores/${id}`,
      method: 'get',
    });
    yield put(actions.succedFetchRestaurant(data))
  } catch (e) {
    yield put(actions.failedFetchRestaurant('err'))
  }
}

function* fetchRestaurantList({ params }) {
  try {
    const { data } = yield call(apiService.request, {
      url: '/stores',
      method: 'get',
      params,
    });
    parseJsonApi(data);
    yield put(actions.succedFetchRestaurantList(
      recordId(data.data).map(id => globalRecords[id]), data.meta));
  } catch (e) {
    yield put(actions.failedFetchRestaurantList('err'))
  }
}

function* createRestaurantSaga() {
  yield takeLeading(actions.CREATE_RESTAURANT, createRestaurant)
}

function* fetchRestaurantSaga() {
  yield takeLeading(actions.FETCH_RESTAURANT, fetchRestaurant)
}

function* fetchRestaurantListSaga() {
  yield takeLeading(actions.FETCH_RESTAURANT_LIST, fetchRestaurantList)
}

export default function* () {
  yield all([
    createRestaurantSaga(),
    fetchRestaurantSaga(),
    fetchRestaurantListSaga(),
  ])
}
