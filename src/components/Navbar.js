import React from 'react';
import { Link } from "@reach/router";

const Navbar = (props) => {
  const { reviewsPath, dashboardPath, signOut } = props;
  return (
    <div>
      <span>REVIEW</span>
      {reviewsPath && <Link to='/reviews'>reviews</Link>}
      {dashboardPath && <Link to='/dashboard'>dashboard</Link>}
      <span onClick={signOut}>Logout</span>
    </div>
  );
}

export default Navbar;
