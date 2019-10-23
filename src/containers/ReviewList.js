import React from 'react';
import { connect } from 'react-redux';
import { signOut, doFetchReviewList } from '../actions';
import { globalRecords } from '../utils';

const ReviewList = ({order, storeId, fetchReviewList}) => {
  React.useEffect(() => { fetchReviewList({storeId}) }, [storeId, order])
  return (
    <div>
      ReviewList { order}
    </div>
  );
}


export default connect((state, { id }) => ({
  isAuthed: state.auth.signedIn,
  reviews: state.reviews.reviewList,
}), (dispatch) => ({
  fetchReviewList: (params) => dispatch(doFetchReviewList(params)),
}))(ReviewList);
