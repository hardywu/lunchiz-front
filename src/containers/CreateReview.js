import React from 'react';
import { connect } from 'react-redux';
import NewReviewForm from '../components/NewReviewForm';
import { doCreateReview } from '../actions';
import { globalRecords } from '../utils';

const CreateReview = ({storeId, createReview}) => {
  return (
    <NewReviewForm onSubmit={createReview} />
    )
}

export default connect((state, { storeId }) => ({
  isAuthed: state.auth.signedIn,
  restaurant: globalRecords[`store_${storeId}`],
}), (dispatch, { storeId }) => ({
  createReview: (data) => dispatch(doCreateReview({...data, storeId})),
}))(CreateReview);
