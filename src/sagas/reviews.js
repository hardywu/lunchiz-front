import {
  call, put, takeLeading, all, takeLatest,
} from 'redux-saga/effects'
import * as actions from '../actions';
import {
  apiService, normalizer, globalRecords,
} from '../utils';

function* createReview({ data: rawData, successCB, errorCB }) {
  try {
    const { data } = yield call(apiService.request, {
      url: '/reviews',
      method: 'post',
      data: normalizer.toJsonApi(rawData),
    });
    const { storeId } = rawData;
    yield put(actions.succedCreateReview(data.data));
    globalRecords[`store_${storeId}`].myReviewId = data.data.split('_')[1];
    if (successCB) yield call(successCB);
  } catch (errors) {    
    yield put(actions.failedCreateReview(Array.isArray(errors)? errors : null));
    if (errorCB) yield call(errorCB);
  }
}

function* fetchReview({ id }) {
  try {
    const { data } = yield call(apiService.request, {
      url: `/reviews/${id}`,
      method: 'get',
    });
    yield put(actions.succedFetchReview(data.data));
  } catch (errors) {
    yield put(actions.failedFetchReview(errors))
  }
}

function* fetchMyReview({ id }) {
  try {
    const { data } = yield call(apiService.request, {
      url: `/reviews/${id}`,
      method: 'get',
    });
    yield put(actions.succedFetchMyReview(data.data));
  } catch (errors) {
    yield put(actions.failedFetchMyReview(errors));
  }
}

function* replyReview({ id, data: rawData, successCB, errorCB }) {
  try {
    const { data } = yield call(apiService.request, {
      url: `/reviews/${id}/reply`,
      method: 'patch',
      data: normalizer.toJsonApi(rawData),
    });
    yield put(actions.succedReplyReview(data.data));
    if (successCB) yield call(successCB);
  } catch (errors) {
    yield put(actions.failedReplyReview(errors));
    if (errorCB) yield call(errorCB);
  }
}

function* deleteReview({ id }) {
  try {
    yield call(apiService.request, {
      url: `/reviews/${id}`,
      method: 'delete',
    });
    yield put(actions.succedDeleteReview(normalizer.idToRecordId(id, 'review')));
  } catch (errors) {
    yield put(actions.failedDeleteReview(errors));
    yield put(actions.showErrMsg(errors.join(' ')))
  }
}

function* fetchReviewList({ params }) {
  try {
    const { data } = yield call(apiService.request, {
      url: '/reviews',
      method: 'get',
      params,
    });
    yield put(actions.succedFetchReviewList(data.data, data.meta));
  } catch (errors) {
    yield put(actions.failedFetchReviewList(errors))
  }
}

function* updateReview({ id, data: rawData, successCB, errorCB }) {
  try {
    const { data } = yield call(apiService.request, {
      url: `/reviews/${id}`,
      method: 'patch',
      data: normalizer.toJsonApi(rawData),
    });
    yield put(actions.succedUpdateReview(data.data));
    if (successCB) yield call(successCB);
  } catch (errors) {
    yield put(actions.failedUpdateReview(errors));
    if (errorCB) yield call(errorCB);
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
