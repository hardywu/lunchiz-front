import React from 'react';
import { Link } from "@reach/router";

const Navbar = (props) => {
  const { reviewsPath, dashboardPath } = props;
  return (
    <div>
      <span>REVIEW</span>
      {reviewsPath && <Link to='/reviews'>reviews</Link>}
      {dashboardPath && <Link to='/dashboard'>dashboard</Link>}
    </div>
  );
}

export default Navbar;
