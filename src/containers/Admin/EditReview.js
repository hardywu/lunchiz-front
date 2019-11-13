import React from 'react';
import { connect } from 'react-redux';
import { navigate } from "@reach/router";
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import ReviewForm from '../../components/ReviewForm';
import { doFetchReview, doUpdateReview } from '../../actions';
import { globalRecords, normalizer } from '../../utils';

const EditReview = ({
  fetchReview, reviewId, review, updateReview ,
  loading, errors,
}) => {
  React.useEffect(() => { fetchReview() }, [fetchReview]);
  if (!review) return <CircularProgress />

  return (<Container maxWidth="sm">
      <ReviewForm
        rate={review.rate} comment={review.comment} reply={review.reply}
        date={review.date} loading={loading}
        onSubmit={updateReview}
      />
    </Container>)
}

export default connect((state, { reviewId }) => ({
  loading: state.reviews.updateLoading,
  errors: state.reviews.updateError,
  review: globalRecords[normalizer.idToRecordId(reviewId, 'review')],
}), (dispatch, { reviewId }) => ({
  fetchReview: () => dispatch(doFetchReview(reviewId)),
  updateReview: (data) => dispatch(
    doUpdateReview(reviewId, data, () => navigate('/admin/reviews'))),
}))(EditReview);
