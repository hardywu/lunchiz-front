export const CREATE_REVIEW = 'CREATE_REVIEW'
export const CREATE_REVIEW_SUCCED = 'CREATE_REVIEW_SUCCED'
export const CREATE_REVIEW_FAILED = 'CREATE_REVIEW_FAILED'
export const UPDATE_REVIEW = 'UPDATE_REVIEW'
export const UPDATE_REVIEW_SUCCED = 'UPDATE_REVIEW_SUCCED'
export const UPDATE_REVIEW_FAILED = 'UPDATE_REVIEW_FAILED'
export const FETCH_REVIEW_LIST = 'FETCH_REVIEW_LIST'
export const FETCH_REVIEW_LIST_SUCCED = 'FETCH_REVIEW_LIST_SUCCED'
export const FETCH_REVIEW_LIST_FAILED = 'FETCH_REVIEW_LIST_FAILED'
export const FETCH_REVIEW = 'FETCH_REVIEW'
export const FETCH_REVIEW_SUCCED = 'FETCH_REVIEW_SUCCED'
export const FETCH_REVIEW_FAILED = 'FETCH_REVIEW_FAILED'
export const FETCH_MY_REVIEW = 'FETCH_MY_REVIEW'
export const FETCH_MY_REVIEW_SUCCED = 'FETCH_MY_REVIEW_SUCCED'
export const FETCH_MY_REVIEW_FAILED = 'FETCH_MY_REVIEW_FAILED'
export const REPLY_REVIEW = 'REPLY_REVIEW'
export const REPLY_REVIEW_SUCCED = 'REPLY_REVIEW_SUCCED'
export const REPLY_REVIEW_FAILED = 'REPLY_REVIEW_FAILED'

export const doCreateReview = (data) => {
  return { type: CREATE_REVIEW, data }
}

export const succedCreateReview = (data) => {
  return { type: CREATE_REVIEW_SUCCED, data }
}

export const failedCreateReview = (message) => {
  return { type: CREATE_REVIEW_FAILED, message }
}

export const doUpdateReview = (data) => {
  return { type: UPDATE_REVIEW, data }
}

export const succedUpdateReview = (data) => {
  return { type: UPDATE_REVIEW_SUCCED, data }
}

export const failedUpdateReview = (message) => {
  return { type: UPDATE_REVIEW_FAILED, message }
}

export const doFetchReviewList = (params) => {
  return { type: FETCH_REVIEW_LIST, params }
}

export const succedFetchReviewList = (data, meta) => {
  return { type: FETCH_REVIEW_LIST_SUCCED, data, meta }
}

export const failedFetchReviewList = (message) => {
  return { type: FETCH_REVIEW_LIST_FAILED, message }
}

export const doFetchReview = (id) => {
  return { type: FETCH_REVIEW, id }
}

export const succedFetchReview = (data) => {
  return { type: FETCH_REVIEW_SUCCED, data }
}

export const failedFetchReview = (message) => {
  return { type: FETCH_REVIEW_FAILED, message }
}

export const doFetchMyReview = (id) => {
  return { type: FETCH_MY_REVIEW, id }
}

export const succedFetchMyReview = (data) => {
  return { type: FETCH_MY_REVIEW_SUCCED, data }
}

export const failedFetchMyReview = (message) => {
  return { type: FETCH_MY_REVIEW_FAILED, message }
}

export const doReplyReview = (id, data) => {
  return { type: REPLY_REVIEW, id, data }
}

export const succedReplyReview = (data) => {
  return { type: REPLY_REVIEW_SUCCED, data }
}

export const failedReplyReview = (message) => {
  return { type: REPLY_REVIEW_FAILED, message }
}
