import React from 'react';
import { Link, Redirect } from "@reach/router";
import { connect } from 'react-redux';
import { doSignUp } from '../actions';
import SignUpForm from '../components/SignUpForm';

const Signup = (props) => {
  const { isAuthed, signUp } = props;
  if (isAuthed) return <Redirect noThrow to='/' />;
  return (
    <div>
      <Link to='/signin'>signin</Link>
      <SignUpForm submit={signUp} />
    </div>
  );
}

export default connect(state => ({
  isAuthed: state.auth.signedIn,
}), (dispatch) => ({
  signUp: (email, password) => dispatch(doSignUp({email, password})),
}))(Signup);
