import React from 'react';
import { connect } from 'react-redux';
import { navigate } from "@reach/router";
import Container from '@material-ui/core/Container';
import NewRestaurantForm from '../components/NewRestaurantForm';
import { doCreateRestaurant } from '../actions';
import { globalRecords } from '../utils';

const CreateRestaurant = ({storeId, createRestaurant, errors, loading}) => {
  return (
    <Container component="main" maxWidth="sm">
      <NewRestaurantForm onSubmit={createRestaurant}
        errors={errors} loading={loading} />
    </Container>
    )
}

export default connect((state, { storeId }) => ({
  isAuthed: state.auth.signedIn,
  restaurant: globalRecords[`store_${storeId}`],
  loading: state.restaurants.createLoading,
  errors: state.restaurants.createError,
}), (dispatch, { storeId }) => ({
  createRestaurant: (data) => dispatch(
    doCreateRestaurant({...data, storeId}, () => navigate('/dashboard'))),
}))(CreateRestaurant);
