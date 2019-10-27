import React from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from "@reach/router";
import { doFetchReviewList, doReplyReview } from '../actions';
import { globalRecords } from '../utils';
import { Button, TextField } from '@material-ui/core';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Review from '../components/Review';

const PendingReviewList = (props) => {
  const { userId, idList, fetchReviewList, replyReview, replyLoading } = props;
  const [replyText, setReplyText] = React.useState('');
  React.useEffect(
    () => { userId && fetchReviewList({ ownerId: userId, reply: null }) },
    [fetchReviewList, userId])

  if (!idList) return <CircularProgress />

  const reviews = idList.map(id => globalRecords[id]).filter(rev => rev);
  const submitReply = (id) => () => {
    replyReview(id, { reply: replyText })
    setReplyText('');
  }
  return (

      <Table>
        <TableBody>
      {
        reviews.map(rev => <TableRow key={rev.id} >
          <TableCell><Review review={rev} /></TableCell>
          <TableCell>
            <Button component={Link} to={`reply/${rev.id}`} >
              Reply
            </Button>
            </TableCell>
          </TableRow>)
      }
      </TableBody>
    </Table>
  );
}


export default connect((state) => ({
  isAuthed: state.auth.signedIn,
  userId: state.auth.user && state.auth.user.slice(5),
  idList: state.reviews.idList,
  total: state.reviews.listTotal || 0,
  replyLoading: state.reviews.replyLoading,
}), (dispatch) => ({
  fetchReviewList: (params) => dispatch(doFetchReviewList(params)),
  replyReview: (id, data) => dispatch(doReplyReview(id, data)),
}))(PendingReviewList);
