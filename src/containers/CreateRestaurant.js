import React from 'react';
import { connect } from 'react-redux';
import NewRestaurantForm from '../components/NewRestaurantForm';
import { doCreateRestaurant } from '../actions';
import { globalRecords } from '../utils';

const CreateRestaurant = ({storeId, createReview}) => {
  return (
    <NewRestaurantForm onSubmit={createReview} />
    )
}

export default connect((state, { storeId }) => ({
  isAuthed: state.auth.signedIn,
  restaurant: globalRecords[`store_${storeId}`],
}), (dispatch, { storeId }) => ({
  createReview: (data) => dispatch(doCreateRestaurant({...data, storeId})),
}))(CreateRestaurant);
