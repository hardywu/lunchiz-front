import React from 'react';
import { Link, Redirect } from "@reach/router";
import { connect } from 'react-redux';
import { doSignUp } from '../actions';
import SignUpForm from '../components/SignUpForm';

const Signup = ({ isAuthed, signUp, signUpError }) => {
  if (isAuthed) return <Redirect noThrow to='/' />;
  return (
    <div>
      <Link to='/login'>signin</Link>
      <SignUpForm onSubmit={signUp} errors={[signUpError]} />
    </div>
  );
}

export default connect(state => ({
  isAuthed: state.auth.signedIn,
  signUpError: state.auth.signUpError,
}), (dispatch) => ({
  signUp: (payload) => dispatch(doSignUp(payload)),
}))(Signup);
