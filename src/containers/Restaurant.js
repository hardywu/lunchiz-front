import React from 'react';
import { connect } from 'react-redux';
import { Link, Router } from "@reach/router";
import CircularProgress from '@material-ui/core/CircularProgress';
import { doFetchRestaurant, doFetchMyReview } from '../actions';
import { globalRecords } from '../utils';
import ReviewList from './ReviewList';
import CreateReview from './CreateReview';
import Review from '../components/Review';

const getMyReviewId = rest => rest && rest.canReview && rest.myReviewId
const getMyReview = rest => getMyReviewId(rest) &&
  globalRecords[`review_${getMyReviewId(rest)}`]

const Restaurant = (props) => {
  const {
    storeId, restaurant, fetchRestaurant, fetchMyReview, myReview,
  } = props;
  const myReviewId = getMyReviewId(restaurant);
  React.useEffect(() => {
    fetchRestaurant(storeId)
  }, [fetchRestaurant, storeId]);
  React.useEffect(() => {
    myReviewId && fetchMyReview(myReviewId);
  }, [fetchMyReview, myReviewId]);

  if (restaurant)  return (
    <div>
      {restaurant.name}
      Average Rate: { restaurant.rate_avg }
      <div>
        <Link to='./'>latest reviews</Link>
        <Link to='highestReviews'>highest reviews</Link>
        <Link to='lowestReviews'>lowest reviews</Link>
        {
          restaurant.canReview && !restaurant.myReviewId &&
          <Link to='newReview'>write a review</Link> }
        { myReview && <Review review={myReview} /> }
      </div>
      <Router>
        <ReviewList path="/"  />
        <ReviewList path="highestReviews" orderByRate='desc' />
        <ReviewList path="lowestReviews" orderByRate='asc' />
        <CreateReview path="newReview"  />
      </Router>
    </div>
  );

  return <CircularProgress />

}

export default connect((state, { storeId }) => ({
  isAuthed: state.auth.signedIn,
  restaurant: globalRecords[`store_${storeId}`],
  myReview: getMyReview(globalRecords[`store_${storeId}`]),
}), (dispatch) => ({
  fetchRestaurant: (id) => dispatch(doFetchRestaurant(id)),
  fetchMyReview: id => dispatch(doFetchMyReview(id)),
}))(Restaurant);
