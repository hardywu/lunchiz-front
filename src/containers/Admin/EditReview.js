import React from 'react';
import { connect } from 'react-redux';
import { navigate } from "@reach/router";
import CircularProgress from '@material-ui/core/CircularProgress';
import ReviewForm from '../../components/ReviewForm';
import { doFetchReview, doUpdateReview } from '../../actions';
import { globalRecords, idToRecordId } from '../../utils';

const EditReview = ({ fetchReview, reviewId, review, updateReview }) => {
  React.useEffect(() => { fetchReview() }, [fetchReview]);
  if (!review) return <CircularProgress />

  return (<div>
      <ReviewForm
        rate={review.rate} comment={review.comment} reply={review.reply}
        date={review.date}
        onSubmit={updateReview}
      />
    </div>)
}

export default connect((state, { reviewId }) => ({
  review: globalRecords[idToRecordId(reviewId, 'review')],
}), (dispatch, { reviewId }) => ({
  fetchReview: () => dispatch(doFetchReview(reviewId)),
  updateReview: (data) => dispatch(
    doUpdateReview(reviewId, data, () => navigate('/admin/reviews'))),
}))(EditReview);
