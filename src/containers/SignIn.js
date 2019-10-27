import React from 'react';
import { Link, Redirect } from "@reach/router";
import { connect } from 'react-redux';
import SignInPanel from '../components/SignInPanel';
import SignInForm from '../components/SignInForm';
import { doSignIn } from '../actions';

const Signin = ({ isAuthed, signIn, signInError }) => {
  if (isAuthed) return <Redirect noThrow to='/' />;
  return (
    <SignInPanel signUpLink={
      <Link to='/register' variant="body2">
        Don't have an account? Sign Up
      </Link>
    } >
      <SignInForm onSubmit={signIn} errors={[signInError]} />
    </SignInPanel>
  );
}

export default connect(state => ({
  isAuthed: state.auth.signedIn,
  signInError: state.auth.signInError,
}), (dispatch) => ({
  signIn: (email, password) => dispatch(doSignIn({email, password})),
}))(Signin);
