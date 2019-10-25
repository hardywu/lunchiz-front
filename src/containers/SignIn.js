import React from 'react';
import { Link, Redirect } from "@reach/router";
import { connect } from 'react-redux';
import SignInForm from '../components/SignInForm';
import { doSignIn } from '../actions';

const Signin = ({ isAuthed, signIn, signInError }) => {
  if (isAuthed) return <Redirect noThrow to='/' />;
  return (
    <div>
      <Link to='/register'>signup</Link>
      <SignInForm onSubmit={signIn} errors={[signInError]} />
    </div>
  );
}

export default connect(state => ({
  isAuthed: state.auth.signedIn,
  signInError: state.auth.signInError,
}), (dispatch) => ({
  signIn: (email, password) => dispatch(doSignIn({email, password})),
}))(Signin);
