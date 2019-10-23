import {
  call, put, takeLeading, all,
} from 'redux-saga/effects'
import * as actions from '../actions';
import {
  apiService, storeCred, removeCred, parseJsonApi, recordId, globalRecords
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

function* signInSaga() {
  yield takeLeading(actions.SIGN_IN, signIn)
}

function* signUpSaga() {
  yield takeLeading(actions.SIGN_UP, signUp)
}

function* signOutSaga() {
  yield takeLeading(actions.SIGN_OUT, removeCred)
}

export default function* () {
  yield all([signInSaga(), signUpSaga(), signOutSaga()])
}
