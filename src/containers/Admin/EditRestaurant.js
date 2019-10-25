import React from 'react';
import { connect } from 'react-redux';
import { navigate } from "@reach/router";
import CircularProgress from '@material-ui/core/CircularProgress';
import RestaurantForm from '../../components/RestaurantForm';
import { doFetchRestaurant, doUpdateRestaurant } from '../../actions';
import { globalRecords, idToRecordId } from '../../utils';

const EditRestaurant = ({
  fetchRestaurant, restaurantId, restaurant, updateRestaurant, updateLoading,
}) => {
  React.useEffect(() => { fetchRestaurant() }, [fetchRestaurant]);
  if (!restaurant) return <CircularProgress />

  return (<div>
      <RestaurantForm
        name={restaurant.name} onSubmit={updateRestaurant} loading={updateLoading}
      />
    </div>)
}

export default connect((state, { restaurantId }) => ({
  updateLoading: state.restaurants.updateLoading,
  restaurant: globalRecords[idToRecordId(restaurantId, 'store')],
}), (dispatch, { restaurantId }) => ({
  fetchRestaurant: () => dispatch(doFetchRestaurant(restaurantId)),
  updateRestaurant: (data) => dispatch(
    doUpdateRestaurant(restaurantId, data, () => navigate('/admin'))),
}))(EditRestaurant);
