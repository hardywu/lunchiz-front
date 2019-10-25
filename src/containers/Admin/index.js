import React from 'react';
import { Redirect, Router, Link } from "@reach/router";
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Navbar from '../../components/Navbar';
import { signOut, doFetchMe } from '../../actions';
import RestaurantList from './RestaurantList';
import UserList from './UserList';
import ReviewList from './ReviewList';
import EditUser from './EditUser';
import EditReview from './EditReview';
import EditRestaurant from './EditRestaurant';
import NotFound from '../../components/NotFound';

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
  if (user.role === 'Owner') return <Redirect noThrow to='/dashboard' />;

  return (
    <div>
      <div>
        <Navbar signOut={signOut} />
        <Link to='./'>admin</Link>
        <Link to='users'>users</Link>
        <Link to='reviews'>reviews</Link>
      </div>
      <Router>
        <RestaurantList path="restaurants" />
        <EditRestaurant path="/restaurants/:restaurantId/edit" />
        <UserList path="users" />
        <EditUser path="users/:userId/edit" />
        <ReviewList path="reviews" />
        <EditReview path="reviews/:reviewId/edit" />
        <NotFound default />
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
