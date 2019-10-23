import React from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { doFetchReviewList } from '../actions';
import { globalRecords } from '../utils';

const ReviewList = ({idList, orderByRate, storeId, fetchReviewList}) => {
  React.useEffect(
    () => { fetchReviewList({storeId, orderByRate}) },
    [fetchReviewList, storeId, orderByRate])

  if (!idList) return <CircularProgress />

  const reviews = idList.map(id => globalRecords[id]).filter(rev => rev);
  return (
    <div>
      ReviewList { orderByRate}
      {reviews.map(rev => <div key={rev.id}>{rev.rate}</div>)}
    </div>
  );
}


export default connect((state, { id }) => ({
  isAuthed: state.auth.signedIn,
  idList: state.reviews.idList,
  total: state.reviews.listTotal || 0,
}), (dispatch) => ({
  fetchReviewList: (params) => dispatch(doFetchReviewList(params)),
}))(ReviewList);
