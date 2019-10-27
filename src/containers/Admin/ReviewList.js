import React from 'react';
import { connect } from 'react-redux';
import { Link } from "@reach/router";
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { doFetchReviewList, doDeleteReview } from '../../actions';
import { globalRecords } from '../../utils';

const ReviewList = ({idList, fetchReviewList, deleteReview, deleteLoading}) => {
  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(20);
  React.useEffect(
    () => { fetchReviewList({perPage, page}) },
    [fetchReviewList, perPage, page])

  if (!idList) return <CircularProgress />

  const reviews = idList.map(id => globalRecords[id]).filter(rev => rev);
  const deleteHandler = id => () => deleteReview(id);
  return (
    <div>
      ReviewList
      {
        reviews.map(rev => <tr key={rev.id}>
          {rev.comment} : {rev.rate}
          <Link to={`${rev.id}/edit`}>edit</Link>
          <Button disabled={deleteLoading} onClick={deleteHandler(rev.id)}>
            delete
          </Button>
        </tr>)
      }
    </div>
  );
}

export default connect((state) => ({
  isAuthed: state.auth.signedIn,
  idList: state.reviews.idList,
  deleteLoading: state.reviews.deleteLoading,
  total: state.reviews.listTotal || 0,
}), (dispatch) => ({
  fetchReviewList: (params) => dispatch(doFetchReviewList(params)),
  deleteReview: (id) => dispatch(doDeleteReview(id)),
}))(ReviewList);
