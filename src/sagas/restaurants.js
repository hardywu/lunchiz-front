import {
  call, put, takeLeading, all,
} from 'redux-saga/effects'
import * as actions from '../actions';
import {
  apiService, toJsonApi, idToRecordId,
} from '../utils';

function* createRestaurant({ data: rawData, successCB, errorCB }) {
  try {
    const { data } = yield call(apiService.request, {
      url: '/stores',
      method: 'post',
      data: toJsonApi(rawData),
    });
    yield put(actions.succedCreateRestaurant(data.data));
    if (successCB) yield call(successCB)
  } catch (errors) {
    yield put(actions.failedCreateRestaurant(errors));
    if (errorCB) yield call(errorCB);
  }
}

function* fetchRestaurant({ id }) {
  try {
    const { data } = yield call(apiService.request, {
      url: `/stores/${id}`,
      method: 'get',
    });
    yield put(actions.succedFetchRestaurant(data.data));
  } catch (errors) {
    yield put(actions.failedFetchRestaurant(errors));
  }
}

function* fetchRestaurantList({ params }) {
  try {
    const { data } = yield call(apiService.request, {
      url: '/stores',
      method: 'get',
      params,
    });
    yield put(actions.succedFetchRestaurantList(data.data, data.meta));
  } catch (errors) {
    yield put(actions.failedFetchRestaurantList(errors));
  }
}

function* deleteRestaurant({ id }) {
  try {
    yield call(apiService.request, {
      url: `/stores/${id}`,
      method: 'delete',
    });
    yield put(actions.succedDeleteRestaurant(idToRecordId(id, 'store')));
  } catch (errors) {
    yield put(actions.failedDeleteRestaurant(errors));
    yield put(actions.showErrMsg(errors.join(' ')))
  }
}

function* updateRestaurant({ id, data: rawData, successCB, errorCB }) {
  try {
    const { data } = yield call(apiService.request, {
      url: `/stores/${id}`,
      method: 'patch',
      data: toJsonApi(rawData),
    });
    yield put(actions.succedUpdateRestaurant(data.data));
    if (successCB) yield call(successCB)
  } catch (errors) {
    yield put(actions.failedUpdateRestaurant(errors));
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
