import React from 'react';
import { Redirect } from "@reach/router";
import { connect } from 'react-redux';
import Navbar from '../components/Navbar';
import { signOut } from '../actions';
import RestaurantList from './RestaurantList';

const Home = (props) => {
  const { isAuthed, signOut } = props
  if (!isAuthed) {
    return <Redirect noThrow to='/signin' />;
  } else {
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
}), (dispatch) => ({
  signOut: () => dispatch(signOut()),
}))(Home);
