import {
  call, put, takeLeading, all,
} from 'redux-saga/effects'
import * as actions from '../actions';
import { apiService, parseJsonApi, toJsonApi, idToRecordId } from '../utils';

function* fetchUser({ id }) {
  try {
    const { data } = yield call(apiService.request, {
      url: `/users/${id}`,
      method: 'get',
    });
    yield put(actions.succedFetchUser(parseJsonApi(data)));
  } catch (e) {
    yield put(actions.failedFetchUser('err'))
  }
}

function* fetchUserList({ params }) {
  try {
    const { data } = yield call(apiService.request, {
      url: '/users',
      method: 'get',
      params,
    });
    yield put(actions.succedFetchUserList(parseJsonApi(data), data.meta));
  } catch (e) {
    yield put(actions.failedFetchUserList('err'))
  }
}

function* updateUser({ id, data: rawData, successCB, errorCB }) {
  try {
    const { data } = yield call(apiService.request, {
      url: `/users/${id}`,
      method: 'patch',
      data: toJsonApi(rawData),
    });
    yield put(actions.succedUpdateUser(parseJsonApi(data)));
    if (successCB) yield call(successCB);
  } catch (e) {
    yield put(actions.failedUpdateUser('err'))
    if (errorCB) yield call(errorCB);
  }
}

function* deleteUser({ id }) {
  try {
    const { data } = yield call(apiService.request, {
      url: `/users/${id}`,
      method: 'delete',
    });
    yield put(actions.succedDeleteUser(idToRecordId(id, 'user')));
  } catch (e) {
    yield put(actions.failedDeleteUser('err'))
  }
}

function* fetchUserSaga() {
  yield takeLeading(actions.FETCH_USER, fetchUser)
}

function* fetchUserListSaga() {
  yield takeLeading(actions.FETCH_USER_LIST, fetchUserList)
}

function* updateUserSaga() {
  yield takeLeading(actions.UPDATE_USER, updateUser)
}

function* deleteUserSaga() {
  yield takeLeading(actions.DELETE_USER, deleteUser)
}

export default function* () {
  yield all([
    fetchUserSaga(),
    fetchUserListSaga(),
    deleteUserSaga(),
    updateUserSaga(),
  ])
}
