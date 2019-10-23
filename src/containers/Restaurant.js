import React from 'react';
import { connect } from 'react-redux';
import { Link, Router } from "@reach/router";
import CircularProgress from '@material-ui/core/CircularProgress';
import { doFetchRestaurant } from '../actions';
import { globalRecords } from '../utils';
import ReviewList from './ReviewList';

const Restaurant = (props) => {
  const { id, restaurant, fetchRestaurant } = props
  React.useEffect(() => { fetchRestaurant(id) }, [fetchRestaurant, id]);
  if (restaurant)  return (
    <div>
      {restaurant.name}
      Average Rate: { restaurant.rate_avg }
      <div>
        <Link to='./'>latest reviews</Link>
        <Link to='highestReviews'>highest reviews</Link>
        <Link to='lowestReviews'>lowest reviews</Link>
      </div>
      <Router>
        <ReviewList path="/"  storeId={id} />
        <ReviewList path="/highestReviews" order={-1} storeId={id} />
        <ReviewList path="/lowestReviews" order={1} storeId={id} />
      </Router>
    </div>
  );

  return <CircularProgress />

}

export default connect((state, { id }) => ({
  isAuthed: state.auth.signedIn,
  restaurant: globalRecords[`store_${id}`],
}), (dispatch) => ({
  fetchRestaurant: (id) => dispatch(doFetchRestaurant(id)),
}))(Restaurant);
