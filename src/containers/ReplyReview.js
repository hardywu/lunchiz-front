import React from 'react';
import { connect } from 'react-redux';
import { navigate } from "@reach/router";
import CircularProgress from '@material-ui/core/CircularProgress';
import { doFetchReview, doReplyReview } from '../actions';
import { globalRecords, idToRecordId } from '../utils';
import ReplyReviewForm from '../components/ReplyReviewForm';

const ReplyReview = ({
  review, fetchReview, replyReview, replyLoading, errors,
}) => {
  React.useEffect(() => { fetchReview() }, [fetchReview]);
  if (!review) return <CircularProgress />
  return (
    <ReplyReviewForm
      reviewer={globalRecords[review.user]}
      review={review}
      loading={replyLoading}
      errors={errors}
      onSubmit={replyReview}
    />
  );
}


export default connect((state, { reviewId }) => ({
  review: globalRecords[idToRecordId(reviewId, 'review')],
  errors: state.reviews.replyError,
  replyLoading: state.reviews.replyLoading,
}), (dispatch, { reviewId }) => ({
  fetchReview: () => dispatch(doFetchReview(reviewId)),
  replyReview: (data) => dispatch(
    doReplyReview(reviewId, data, () => navigate('/dashboard/pendingReviews'))),
}))(ReplyReview);
