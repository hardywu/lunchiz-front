import {
  delay, select, call, put, takeLeading, all,
} from 'redux-saga/effects'
import * as actions from '../actions';
import { apiService, storeCred } from '../utils';

function* signIn({}) {
  try {
    yield put(actions.succedSignIn())
  } catch (e) {
    yield put(actions.failedSignIn())
  }
}

function* signInSaga() {
  yield takeLeading(actions.SIGN_IN, signIn)
}

function* signUp({ payload: { email, password } }) {
  try {
    const { data, headers } = yield call(apiService.request, {
      url: '/auth/signup',
      method: 'post',
      data: { email, password },
    });
    storeCred(headers['authorization']);
    yield put(actions.succedSignUp(data))
  } catch (e) {
    // const { response: { data }} = e;
    yield put(actions.failedSignUp('data.errors'))
  }
}

function* signUpSaga() {
  yield takeLeading(actions.SIGN_UP, signUp)
}

export default function* () {
  yield all([signInSaga(), signUpSaga()])
}
