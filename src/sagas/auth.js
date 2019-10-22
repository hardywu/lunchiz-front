import {
  delay, select, call, put, takeLeading, all,
} from 'redux-saga/effects'
import * as actions from '../actions';

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

function* signUp({}) {
  try {
    yield put(actions.succedSignUp())
  } catch (e) {
    yield put(actions.failedSignUp())
  }
}

function* signUpSaga() {
  yield takeLeading(actions.SIGN_IN, signUp)
}

export default function* () {
  yield all([signInSaga(), signUpSaga()])
}
