import React from 'react';
import { Redirect } from "@reach/router";
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Navbar from '../components/Navbar';
import { signOut, doFetchMe } from '../actions';
import RestaurantList from './RestaurantList';

const Home = (props) => {
  const { isAuthed, user, signOut, fetchMe } = props
  if (!isAuthed) {
    return <Redirect noThrow to='/signin' />;
  }

  if (!user) {
    fetchMe();
    return <CircularProgress />
  }

  switch (user.role) {
    case 'Owner':
      return (
        <div>
          <Navbar signOut={signOut} />
          <RestaurantList ownerId={user.id} />
        </div>
      )
    case 'Admin':
      return <div>admin</div>;
    default:
      return (
        <div>
          <Navbar signOut={signOut} />
          <RestaurantList />
        </div>
      );
  }
}

export default connect(state => ({
  isAuthed: state.auth.signedIn,
  user: state.auth.user,
}), (dispatch) => ({
  signOut: () => dispatch(signOut()),
  fetchMe: () => dispatch(doFetchMe()),
}))(Home);
