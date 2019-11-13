import {
  call, put, takeLeading, all,
} from 'redux-saga/effects'
import * as actions from '../actions';
import {
  apiService, storeCred, removeCred,
} from '../utils';

function* signIn({ payload }) {
  try {
    const { data, headers } = yield call(apiService.request, {
      url: '/auth/signin',
      method: 'post',
      data: payload,
    });
    storeCred(headers['authorization']);
    yield put(actions.succedSignIn(data.data));
  } catch (err) {
    yield put(actions.failedSignIn(['Username or password is incorrect']));
  }
}

function* signUp({ payload }) {
  try {
    const { data, headers } = yield call(apiService.request, {
      url: '/auth/signup',
      method: 'post',
      data: payload,
    });
    storeCred(headers['authorization']);
    yield put(actions.succedSignUp(data.data));
  } catch (errors) {
    yield put(actions.failedSignUp(errors));
  }
}

function* fetchMe() {
  try {
    const { data } = yield call(apiService.request, {
      url: '/auth/me',
      method: 'get',
    });
    yield put(actions.succedFetchMe(data.data));
  } catch (errors) {
    yield put(actions.failedFetchMe(errors));
    yield put(actions.signOut())
  }
}

function* signInSaga() {
  yield takeLeading(actions.SIGN_IN, signIn)
}

function* signUpSaga() {
  yield takeLeading(actions.SIGN_UP, signUp)
}

function* signOutSaga() {
  yield takeLeading(actions.SIGN_OUT, removeCred)
}

function* fetchMeSaga() {
  yield takeLeading(actions.FETCH_ME, fetchMe)
}

export default function* () {
  yield all([signInSaga(), signUpSaga(), signOutSaga(), fetchMeSaga()])
}
