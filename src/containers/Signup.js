import React from 'react';
import { Link, Redirect } from "@reach/router";

const Signup = (props) => {
  const { isAuthed } = props;
  if (isAuthed) return <Redirect noThrow to='/' />;
  return (
    <div>
      <Link to='/signin'>signin</Link>
      Signup
    </div>
  );
}

export default Signup;
