import React from 'react';
import { Link, Redirect } from "@reach/router";
import { connect } from 'react-redux';
import SignInForm from '../components/SignInForm';
import { doSignIn } from '../actions';

const Signin = (props) => {
  const { isAuthed, signIn } = props;
  if (isAuthed) return <Redirect noThrow to='/' />;
  return (
    <div>
      <Link to='/signup'>signup</Link>
      <SignInForm submit={signIn} />
    </div>
  );
}

export default connect(state => ({
  isAuthed: state.auth.signedIn,
}), (dispatch) => ({
  signIn: (email, password) => dispatch(doSignIn({email, password})),
}))(Signin);
