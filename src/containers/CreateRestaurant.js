import React from 'react';
import { connect } from 'react-redux';
import { navigate } from "@reach/router";
import Container from '@material-ui/core/Container';
import NewRestaurantForm from '../components/NewRestaurantForm';
import { doCreateRestaurant } from '../actions';
import { globalRecords } from '../utils';

const CreateRestaurant = ({storeId, createRestaurant}) => {
  return (
    <Container component="main" maxWidth="sm">
      <NewRestaurantForm onSubmit={createRestaurant} />
    </Container>
    )
}

export default connect((state, { storeId }) => ({
  isAuthed: state.auth.signedIn,
  restaurant: globalRecords[`store_${storeId}`],
}), (dispatch, { storeId }) => ({
  createRestaurant: (data) => dispatch(
    doCreateRestaurant({...data, storeId}, () => navigate('/dashboard'))),
}))(CreateRestaurant);
