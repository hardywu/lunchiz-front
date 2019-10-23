import React from 'react';
import { Redirect, Router, Link } from "@reach/router";
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Navbar from '../components/Navbar';
import { signOut, doFetchMe } from '../actions';
import RestaurantList from './RestaurantList';
import ReviewList from './ReviewList';

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
        <Link to='reviews'>reviews</Link>
      </div>
      <Router>
        <RestaurantList path="/" ownerId={user.id} />
        <ReviewList path="reviews" />
      </Router>
    </div>
  );
}

export default connect(state => ({
  isAuthed: state.auth.signedIn,
  user: state.auth.user,
}), (dispatch) => ({
  signOut: () => dispatch(signOut()),
  fetchMe: () => dispatch(doFetchMe()),
}))(Admin);
