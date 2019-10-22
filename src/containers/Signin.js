import React from 'react';
import { Link, Redirect } from "@reach/router";

const Signin = (props) => {
  const { isAuthed } = props;
  if (isAuthed) return <Redirect noThrow to='/' />;
  return (
    <div>
      <Link to='/signup'>signup</Link>
    </div>
  );
}

export default Signin;
