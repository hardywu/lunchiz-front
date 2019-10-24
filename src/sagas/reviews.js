import {
  call, put, takeLeading, all, takeLatest,
} from 'redux-saga/effects'
import * as actions from '../actions';
import { apiService, parseJsonApi, toJsonApi, globalRecords } from '../utils';
import { navigate } from "@reach/router";

function* createReview({ data: rawData }) {
  try {
    const { data } = yield call(apiService.request, {
      url: '/reviews',
      method: 'post',
      data: toJsonApi(rawData),
    });
    const { storeId } = rawData;
    yield put(actions.succedCreateReview(parseJsonApi(data)));
    globalRecords[`store_${storeId}`].myReviewId = data.data.id;
    yield call(navigate(`/restaurant/${storeId}`))
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

function* fetchMyReview({ id }) {
  try {
    const { data } = yield call(apiService.request, {
      url: `/reviews/${id}`,
      method: 'get',
    });
    yield put(actions.succedFetchMyReview(parseJsonApi(data)));
  } catch (e) {
    yield put(actions.failedFetchMyReview('err'))
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

function* fetchMyReviewSaga() {
  yield takeLatest(actions.FETCH_MY_REVIEW, fetchMyReview)
}


export default function* () {
  yield all([
    createReviewSaga(),
    fetchReviewSaga(),
    fetchReviewListSaga(),
    fetchMyReviewSaga(),
  ])
}
