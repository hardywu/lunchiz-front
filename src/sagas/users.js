import {
  call, put, takeLeading, all,
} from 'redux-saga/effects'
import * as actions from '../actions';
import {
  apiService, normalizer,
} from '../utils';

function* fetchUser({ id }) {
  try {
    const { data } = yield call(apiService.request, {
      url: `/users/${id}`,
      method: 'get',
    });
    yield put(actions.succedFetchUser(data.data));
  } catch (errors) {
    yield put(actions.failedFetchUser(errors))
  }
}

function* fetchUserList({ params }) {
  try {
    const { data } = yield call(apiService.request, {
      url: '/users',
      method: 'get',
      params,
    });
    yield put(actions.succedFetchUserList(data.data, data.meta));
  } catch (errors) {
    yield put(actions.failedFetchUserList(errors))
  }
}

function* updateUser({ id, data: rawData, successCB, errorCB }) {
  try {
    const { data } = yield call(apiService.request, {
      url: `/users/${id}`,
      method: 'patch',
      data: normalizer.toJsonApi(rawData),
    });
    yield put(actions.succedUpdateUser(data.data));
    if (successCB) yield call(successCB);
  } catch (errors) {
    yield put(actions.failedUpdateUser(errors));
    yield put(actions.showErrMsg(errors.join(' ')));
    if (errorCB) yield call(errorCB);
  }
}

function* deleteUser({ id }) {
  try {
    yield call(apiService.request, {
      url: `/users/${id}`,
      method: 'delete',
    });
    yield put(actions.succedDeleteUser(normalizer.idToRecordId(id, 'user')));
  } catch (errors) {
    yield put(actions.failedDeleteUser(errors));
    yield put(actions.showErrMsg(errors.join(' ')));
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
