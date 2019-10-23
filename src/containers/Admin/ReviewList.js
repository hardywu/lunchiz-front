import React from 'react';
import { connect } from 'react-redux';
import { globalRecords } from '../../utils';
import { doFetchReviewList } from '../../actions';

const ReviewList = () => {
  return (
    <div>
      ReviewList
    </div>
  );
}

export default connect((state, { id }) => ({
  isAuthed: state.auth.signedIn,
  restaurant: globalRecords[`store_${id}`],
}), (dispatch) => ({
  fetchRestaurant: (id) => dispatch(doFetchReviewList(id)),
}))(ReviewList);
