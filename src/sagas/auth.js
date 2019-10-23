import {
  call, put, takeLeading, all,
} from 'redux-saga/effects'
import * as actions from '../actions';
import {
  apiService, storeCred, removeCred, parseJsonApi,
} from '../utils';

function* signIn({ payload: { email, password } }) {
  try {
    const { data, headers } = yield call(apiService.request, {
      url: '/auth/signin',
      method: 'post',
      data: { email, password },
    });
    storeCred(headers['authorization']);
    yield put(actions.succedSignIn(parseJsonApi(data)));
  } catch (e) {
    yield put(actions.failedSignIn('err'))
  }
}

function* signUp({ payload: { email, password } }) {
  try {
    const { data, headers } = yield call(apiService.request, {
      url: '/auth/signup',
      method: 'post',
      data: { email, password },
    });
    storeCred(headers['authorization']);
    yield put(actions.succedSignUp(parseJsonApi(data)));
  } catch (e) {
    // const { response: { data }} = e;
    yield put(actions.failedSignUp('data.errors'))
  }
}

function* fetchMe() {
  try {
    const { data } = yield call(apiService.request, {
      url: '/auth/me',
      method: 'get',
    });
    yield put(actions.succedFetchMe(parseJsonApi(data)));
  } catch (e) {
    removeCred();
    yield put(actions.failedFetchMe('data.errors'))
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