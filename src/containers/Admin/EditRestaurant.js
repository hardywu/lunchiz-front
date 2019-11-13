import React from 'react';
import { connect } from 'react-redux';
import { navigate } from "@reach/router";
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import RestaurantForm from '../../components/RestaurantForm';
import { doFetchRestaurant, doUpdateRestaurant } from '../../actions';
import { globalRecords, normalizer } from '../../utils';

const EditRestaurant = ({
  fetchRestaurant, restaurantId, restaurant, updateRestaurant, updateLoading,
}) => {
  React.useEffect(() => { fetchRestaurant() }, [fetchRestaurant]);
  if (!restaurant) return <CircularProgress />

  return (<Container maxWidth="sm">
      <RestaurantForm
        name={restaurant.name} onSubmit={updateRestaurant} loading={updateLoading}
      />
    </Container>)
}

export default connect((state, { restaurantId }) => ({
  updateLoading: state.restaurants.updateLoading,
  restaurant: globalRecords[normalizer.idToRecordId(restaurantId, 'store')],
}), (dispatch, { restaurantId }) => ({
  fetchRestaurant: () => dispatch(doFetchRestaurant(restaurantId)),
  updateRestaurant: (data) => dispatch(
    doUpdateRestaurant(restaurantId, data, () => navigate('/admin/restaurants'))),
}))(EditRestaurant);
