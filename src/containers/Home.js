import React from 'react';
import { Redirect, Link } from "@reach/router";
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Navbar from '../components/Navbar';
import { signOut, doFetchMe } from '../actions';
import { globalRecords } from '../utils';
import RestaurantList from './RestaurantList';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

const Home = (props) => {
  const { isAuthed, user, signOut, fetchMe } = props
  React.useEffect(() => {
    fetchMe()
  }, [fetchMe])

  if (user && user.role === 'Owner') return <Redirect noThrow to='/dashboard' />;
  if (user && user.role === 'Admin') return <Redirect noThrow to='/admin' />;

  return (
    <div>
      <Navbar isAuthed={isAuthed} signOut={signOut}>
        <Link to="/">REVIEW</Link>
      </Navbar>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <br /><br />
        <RestaurantList />
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
}))(Home);
