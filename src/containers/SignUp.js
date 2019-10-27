import React from 'react';
import { Link, Redirect } from "@reach/router";
import { connect } from 'react-redux';
import { doSignUp } from '../actions';
import SignUpForm from '../components/SignUpForm';
import SignUpPanel from '../components/SignUpPanel';

const Signup = ({ isAuthed, signUp, signUpError }) => {
  if (isAuthed) return <Redirect noThrow to='/' />;
  return (
    <SignUpPanel
      signInLink={
        <Link to='/login' variant="body2">
          Already have an account? Sign in
        </Link>
      }
    >
      <SignUpForm onSubmit={signUp} errors={[signUpError]}

      />
    </SignUpPanel>
  );
}

export default connect(state => ({
  isAuthed: state.auth.signedIn,
  signUpError: state.auth.signUpError,
}), (dispatch) => ({
  signUp: (payload) => dispatch(doSignUp(payload)),
}))(Signup);
