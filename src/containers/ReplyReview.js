import React from 'react';
import { connect } from 'react-redux';
import { navigate } from "@reach/router";
import CircularProgress from '@material-ui/core/CircularProgress';
import { doFetchReview, doReplyReview } from '../actions';
import { globalRecords, idToRecordId } from '../utils';
import { Button, TextField } from '@material-ui/core';
import ReplyReviewForm from '../components/ReplyReviewForm';
import Review from '../components/Review';

const ReplyReview = ({
  review, fetchReview, replyReview, replyLoading,
}) => {
  React.useEffect(() => { fetchReview() }, []);
  if (!review) return <CircularProgress />
  return (
    <ReplyReviewForm
      reviewer={globalRecords[review.user]}
      review={review}
      loading={replyLoading}
      onSubmit={replyReview}
    />
  );
}


export default connect((state, { reviewId }) => ({
  review: globalRecords[idToRecordId(reviewId, 'review')],
  replyLoading: state.reviews.replyLoading,
}), (dispatch, { reviewId }) => ({
  fetchReview: () => dispatch(doFetchReview(reviewId)),
  replyReview: (data) => dispatch(
    doReplyReview(reviewId, data, () => navigate('/dashboard/pendingReviews'))),
}))(ReplyReview);
