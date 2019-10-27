import {
  call, put, takeLeading, all,
} from 'redux-saga/effects'
import * as actions from '../actions';
import { apiService, parseJsonApi, toJsonApi, idToRecordId } from '../utils';

function* createRestaurant({ data: rawData, successCB, errorCB }) {
  try {
    const { data } = yield call(apiService.request, {
      url: '/stores',
      method: 'post',
      data: toJsonApi(rawData),
    });
    yield put(actions.succedCreateRestaurant(parseJsonApi(data)));
    if (successCB) yield call(successCB)
  } catch (e) {
    yield put(actions.failedCreateRestaurant('err'))
    if (errorCB) yield call(errorCB);
  }
}

function* fetchRestaurant({ id }) {
  try {
    const { data } = yield call(apiService.request, {
      url: `/stores/${id}`,
      method: 'get',
    });
    yield put(actions.succedFetchRestaurant(parseJsonApi(data)));
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
    yield put(actions.succedFetchRestaurantList(parseJsonApi(data), data.meta));
  } catch (e) {
    yield put(actions.failedFetchRestaurantList('err'))
  }
}

function* deleteRestaurant({ id }) {
  try {
    yield call(apiService.request, {
      url: `/stores/${id}`,
      method: 'delete',
    });
    yield put(actions.succedDeleteRestaurant(idToRecordId(id, 'store')));
  } catch (e) {
    yield put(actions.failedDeleteRestaurant('err'))
  }
}

function* updateRestaurant({ id, data: rawData, successCB, errorCB }) {
  try {
    const { data } = yield call(apiService.request, {
      url: `/stores/${id}`,
      method: 'patch',
      data: toJsonApi(rawData),
    });
    yield put(actions.succedUpdateRestaurant(parseJsonApi(data)));
    if (successCB) yield call(successCB)
  } catch (e) {
    yield put(actions.failedUpdateRestaurant('err'))
    if (errorCB) yield call(errorCB);
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

function* deleteRestaurantSaga() {
  yield takeLeading(actions.DELETE_RESTAURANT, deleteRestaurant)
}

function* updateRestaurantSaga() {
  yield takeLeading(actions.UPDATE_RESTAURANT, updateRestaurant)
}

export default function* () {
  yield all([
    createRestaurantSaga(),
    fetchRestaurantSaga(),
    fetchRestaurantListSaga(),
    deleteRestaurantSaga(),
    updateRestaurantSaga(),
  ])
}
