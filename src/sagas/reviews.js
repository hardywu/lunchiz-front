import {
  call, put, takeLeading, all, takeLatest,
} from 'redux-saga/effects'
import * as actions from '../actions';
import {
  apiService, parseJsonApi, toJsonApi, globalRecords, idToRecordId,
} from '../utils';

function* createReview({ data: rawData, successCB, errorCB }) {
  try {
    const { data } = yield call(apiService.request, {
      url: '/reviews',
      method: 'post',
      data: toJsonApi(rawData),
    });
    const { storeId } = rawData;
    yield put(actions.succedCreateReview(parseJsonApi(data)));
    globalRecords[`store_${storeId}`].myReviewId = data.data.id;
    if (successCB) yield call(successCB);
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

function* replyReview({ id, data: rawData }) {
  try {
    const { data } = yield call(apiService.request, {
      url: `/reviews/${id}/reply`,
      method: 'patch',
      data: toJsonApi(rawData),
    });
    yield put(actions.succedReplyReview(parseJsonApi(data)));
  } catch (e) {
    yield put(actions.failedReplyReview('err'))
  }
}

function* deleteReview({ id }) {
  try {
    const { data } = yield call(apiService.request, {
      url: `/reviews/${id}`,
      method: 'delete',
    });
    yield put(actions.succedDeleteReview(idToRecordId(id, 'review')));
  } catch (e) {
    yield put(actions.failedDeleteReview('err'))
  }
}

function* fetchReviewList({ params }) {
  try {
    const param = Object.keys(params).includes('reply') ? '?reply' : '';
    const { data } = yield call(apiService.request, {
      url: '/reviews' + param,
      method: 'get',
      params,
    });
    yield put(actions.succedFetchReviewList(parseJsonApi(data), data.meta));
  } catch (e) {
    yield put(actions.failedFetchReviewList('err'))
  }
}

function* updateReview({ id, data: rawData, successCB, errorCB }) {
  try {
    const { data } = yield call(apiService.request, {
      url: `/reviews/${id}`,
      method: 'patch',
      data: toJsonApi(rawData),
    });
    yield put(actions.succedUpdateReview(parseJsonApi(data)));
    if (successCB) yield call(successCB);
  } catch (e) {
    yield put(actions.failedUpdateReview('err'))
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

function* replyReviewSaga() {
  yield takeLeading(actions.REPLY_REVIEW, replyReview)
}

function* deleteReviewSaga() {
  yield takeLeading(actions.DELETE_REVIEW, deleteReview)
}

function* updateReviewSaga() {
  yield takeLeading(actions.UPDATE_REVIEW, updateReview)
}

export default function* () {
  yield all([
    createReviewSaga(),
    fetchReviewSaga(),
    fetchReviewListSaga(),
    fetchMyReviewSaga(),
    replyReviewSaga(),
    deleteReviewSaga(),
    updateReviewSaga(),
  ])
}
