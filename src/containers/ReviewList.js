import React from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { doFetchReviewList } from '../actions';
import { globalRecords } from '../utils';
import Review from '../components/Review';

const ReviewList = ({storeId, idList, orderByRate, fetchReviewList}) => {
  React.useEffect(
    () => { fetchReviewList({storeId, orderByRate}) },
    [fetchReviewList, storeId, orderByRate])

  if (!idList) return <CircularProgress />
  const reviews = idList.map(id => globalRecords[id]).filter(rev => rev);

  return (
    <div>
      {reviews.map(rev => <div key={rev.id}><Review review={rev} reviewer={globalRecords[rev.user]} /></div>)}
    </div>
  );
}


export default connect((state) => ({
  isAuthed: state.auth.signedIn,
  idList: state.reviews.idList,
  total: state.reviews.listTotal || 0,
}), (dispatch) => ({
  fetchReviewList: (params) => dispatch(doFetchReviewList(params)),
}))(ReviewList);
