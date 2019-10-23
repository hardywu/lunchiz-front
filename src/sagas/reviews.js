import {
  call, put, takeLeading, all,
} from 'redux-saga/effects'
import * as actions from '../actions';
import { apiService, parseJsonApi } from '../utils';

function* createReview({ data: { name } }) {
  try {
    const { data } = yield call(apiService.request, {
      url: '/reviews',
      method: 'post',
      data: { name },
    });
    yield put(actions.succedCreateReview(data))
  } catch (e) {
    yield put(actions.failedCreateReview('err'))
  }
}

function* fetchReview({ id }) {
  try {
    const { data } = yield call(apiService.request, {
      url: `/reviews/${id}`,
      method: 'get',
    });
    yield put(actions.succedFetchReview(parseJsonApi(data)));
  } catch (e) {
    yield put(actions.failedFetchReview('err'))
  }
}

function* fetchReviewList({ params }) {
  try {
    const { data } = yield call(apiService.request, {
      url: '/reviews',
      method: 'get',
      params,
    });
    yield put(actions.succedFetchReviewList(parseJsonApi(data), data.meta));
  } catch (e) {
    yield put(actions.failedFetchReviewList('err'))
  }
}

function* createReviewSaga() {
  yield takeLeading(actions.CREATE_REVIEW, createReview)
}

function* fetchReviewSaga() {
  yield takeLeading(actions.FETCH_REVIEW, fetchReview)
}

function* fetchReviewListSaga() {
  yield takeLeading(actions.FETCH_REVIEW_LIST, fetchReviewList)
}

export default function* () {
  yield all([
    createReviewSaga(),
    fetchReviewSaga(),
    fetchReviewListSaga(),
  ])
}
