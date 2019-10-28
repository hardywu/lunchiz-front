import React from 'react';
import { connect } from 'react-redux';
import { navigate } from "@reach/router";
import NewReviewForm from '../components/NewReviewForm';
import { doCreateReview } from '../actions';
import { globalRecords } from '../utils';

const CreateReview = ({storeId, createReview, errors, loading}) => {
  return (
    <NewReviewForm onSubmit={createReview}
      errors={errors} loading={loading} />
    )
}

export default connect((state, { storeId }) => ({
  isAuthed: state.auth.signedIn,
  restaurant: globalRecords[`store_${storeId}`],
  loading: state.reviews.createLoading,
  errors: state.reviews.createError,
}), (dispatch, { storeId }) => ({
  createReview: (data) => dispatch(doCreateReview(
    {...data, storeId}, () => navigate(`/restaurant/${storeId}`)
  )),
}))(CreateReview);
