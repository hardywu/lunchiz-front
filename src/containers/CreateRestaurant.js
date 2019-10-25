import React from 'react';
import { connect } from 'react-redux';
import { navigate } from "@reach/router";
import NewRestaurantForm from '../components/NewRestaurantForm';
import { doCreateRestaurant } from '../actions';
import { globalRecords } from '../utils';

const CreateRestaurant = ({storeId, createRestaurant}) => {
  return (
    <NewRestaurantForm onSubmit={createRestaurant} />
    )
}

export default connect((state, { storeId }) => ({
  isAuthed: state.auth.signedIn,
  restaurant: globalRecords[`store_${storeId}`],
}), (dispatch, { storeId }) => ({
  createRestaurant: (data) => dispatch(
    doCreateRestaurant({...data, storeId}, () => navigate('/dashboard'))),
}))(CreateRestaurant);
