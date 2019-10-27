import React from 'react';
import { Redirect, Router, Link } from "@reach/router";
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Navbar from '../components/Navbar';
import { signOut, doFetchMe } from '../actions';
import RestaurantList from './RestaurantList';
import PendingReviewList from './PendingReviewList';
import ReplyReview from './ReplyReview';
import { globalRecords } from '../utils';
import CreateRestaurant from './CreateRestaurant';

const Admin = (props) => {
  const { isAuthed, user, signOut, fetchMe } = props
  if (!isAuthed) {
    return <Redirect noThrow to='/login' />;
  }

  if (!user) {
    fetchMe();
    return <CircularProgress />
  }

  if (user.role === 'User') return <Redirect noThrow to='/' />;
  if (user.role === 'Admin') return <Redirect noThrow to='/admin' />;

  return (
    <div>
      <Navbar signOut={signOut}>
        <Button component={Link} to='./'>Home</Button>
        <Button component={Link} to='pendingReviews'>Pending Reviews</Button>
        <Button component={Link} to='createRestaurant'>Add my restaurant</Button>
      </Navbar>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <br /><br />
        <Router>
          <RestaurantList path="/" ownerId={user.id} />
          <PendingReviewList path="pendingReviews" />
          <ReplyReview path="pendingReviews/reply/:reviewId" />
          <CreateRestaurant path='createRestaurant' />
        </Router>
      </Container>
    </div>
  );
}

export default connect(state => ({
  isAuthed: state.auth.signedIn,
  user: globalRecords[state.auth.user],
}), (dispatch) => ({
  signOut: () => dispatch(signOut()),
  fetchMe: () => dispatch(doFetchMe()),
}))(Admin);
