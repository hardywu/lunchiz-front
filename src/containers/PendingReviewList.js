import React from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { doFetchReviewList, doReplyReview } from '../actions';
import { globalRecords } from '../utils';
import { Button, TextField } from '@material-ui/core';

const PendingReviewList = (props) => {
  const { userId, idList, fetchReviewList, replyReview, replyLoading } = props;
  const [replyId, setReplyId] = React.useState(null);
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
    <div>
      ReviewList
      {
        reviews.map(rev => <div key={rev.id}>
          {rev.rate}: {rev.comment}
          <Button disabled={replyLoading} onClick={() => {setReplyId(rev.id); setReplyText('');}}>
            Reply
          </Button>
          {
            replyId === rev.id &&
            <div>
              <TextField
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                multiline
              />
              <Button disabled={replyLoading} onClick={submitReply(rev.id)}>Publish</Button>
            </div>
          }
          </div>)
      }
    </div>
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
