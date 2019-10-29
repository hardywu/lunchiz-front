import {
  call, put, takeLeading, all,
} from 'redux-saga/effects'
import * as actions from '../actions';
import {
  apiService, parseJsonApi, toJsonApi, idToRecordId, parseJsonError,
  getErrorData,
} from '../utils';

function* createRestaurant({ data: rawData, successCB, errorCB }) {
  try {
    const { data } = yield call(apiService.request, {
      url: '/stores',
      method: 'post',
      data: toJsonApi(rawData),
    });
    yield put(actions.succedCreateRestaurant(parseJsonApi(data)));
    if (successCB) yield call(successCB)
  } catch (err) {
    const { response = {} } = err;
    const { data = {} } = response;
    yield put(actions.failedCreateRestaurant(parseJsonError(data)));
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
  } catch (err) {
    const { response = {} } = err;
    const { data = {} } = response;
    yield put(actions.failedFetchRestaurant(parseJsonError(data)));
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
  } catch (err) {
    const { response = {} } = err;
    const { data = {} } = response;
    yield put(actions.failedFetchRestaurantList(parseJsonError(data)));
  }
}

function* deleteRestaurant({ id }) {
  try {
    yield call(apiService.request, {
      url: `/stores/${id}`,
      method: 'delete',
    });
    yield put(actions.succedDeleteRestaurant(idToRecordId(id, 'store')));
  } catch (err) {
    yield put(actions.failedDeleteRestaurant(getErrorData(err)));
    yield put(actions.showErrMsg(getErrorData(err).join(' ')))
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
  } catch (err) {
    const { response = {} } = err;
    const { data = {} } = response;
    yield put(actions.failedUpdateRestaurant(parseJsonError(data)));
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
