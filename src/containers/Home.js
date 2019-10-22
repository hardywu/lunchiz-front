import React from 'react';
import { Redirect } from "@reach/router";
import { connect } from 'react-redux';
import Navbar from '../components/Navbar';

const Home = (props) => {
  const { isAuthed } = props
  if (!isAuthed) {
    return <Redirect noThrow to='/signin' />;
  } else {
    return (
      <div>
        <Navbar />
        Home
      </div>
    );
  }
}

export default connect(state => ({
  isAuthed: state.auth.signedIn,
}))(Home);
