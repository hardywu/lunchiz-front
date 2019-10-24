import React from 'react';
import { Redirect, Router, Link } from "@reach/router";
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Navbar from '../components/Navbar';
import { signOut, doFetchMe } from '../actions';
import RestaurantList from './RestaurantList';
import PendingReviewList from './PendingReviewList';
import { globalRecords } from '../utils';
import CreateRestaurant from './CreateRestaurant';

const Admin = (props) => {
  const { isAuthed, user, signOut, fetchMe } = props
  if (!isAuthed) {
    return <Redirect noThrow to='/signin' />;
  }

  if (!user) {
    fetchMe();
    return <CircularProgress />
  }

  if (user.role === 'User') return <Redirect noThrow to='/' />;
  if (user.role === 'Admin') return <Redirect noThrow to='/admin' />;

  return (
    <div>
      <div>
        <Navbar signOut={signOut} />
        <Link to='./'>home</Link>
        <Link to='pendingReviews'>pendingReviews</Link>
        <Link to='createRestaurant'>add my restaurant</Link>
      </div>
      <Router>
        <RestaurantList path="/" ownerId={user.id} />
        <PendingReviewList path="pendingReviews" />
        <CreateRestaurant path='createRestaurant' />
      </Router>
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
