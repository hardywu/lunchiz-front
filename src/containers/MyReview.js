import React from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { doFetchMyReview } from '../actions';
import { globalRecords } from '../utils';
import Review from '../components/Review';

const getMyReviewId = rest => rest && rest.canReview && rest.myReviewId
const getMyReview = rest => getMyReviewId(rest) &&
  globalRecords[`review_${getMyReviewId(rest)}`]

const MyReview = ({
  storeId, restaurant, fetchMyReview, myReview,
}) => {
  const myReviewId = getMyReviewId(restaurant);
  React.useEffect(() => {
    myReviewId && fetchMyReview(myReviewId);
  }, [fetchMyReview, myReviewId]);

  if (!myReview) return <CircularProgress />

  return (
    <Review review={myReview} reviewer={globalRecords[myReview.user]} />
  );
}


export default connect((state, { storeId }) => ({
  restaurant: globalRecords[`store_${storeId}`],
  myReview: getMyReview(globalRecords[`store_${storeId}`]),
}), (dispatch) => ({
  fetchMyReview: id => dispatch(doFetchMyReview(id)),
}))(MyReview);
