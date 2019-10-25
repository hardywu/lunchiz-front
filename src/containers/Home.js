import React from 'react';
import { Redirect } from "@reach/router";
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Navbar from '../components/Navbar';
import { signOut, doFetchMe } from '../actions';
import { globalRecords } from '../utils';
import RestaurantList from './RestaurantList';

const Home = (props) => {
  const { isAuthed, user, signOut, fetchMe } = props
  if (!isAuthed) {
    return <Redirect noThrow to='/login' />;
  }

  if (!user) {
    fetchMe();
    return <CircularProgress />
  }

  if (user.role === 'Owner') return <Redirect noThrow to='/dashboard' />;
  if (user.role === 'Admin') return <Redirect noThrow to='/admin' />;

  return (
    <div>
      <Navbar signOut={signOut} />
      <RestaurantList />
    </div>
  );
}

export default connect(state => ({
  isAuthed: state.auth.signedIn,
  user: globalRecords[state.auth.user],
}), (dispatch) => ({
  signOut: () => dispatch(signOut()),
  fetchMe: () => dispatch(doFetchMe()),
}))(Home);
