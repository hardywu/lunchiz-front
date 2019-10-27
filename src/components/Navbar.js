import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { fade, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from "@reach/router";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


const Navbar = ({ reviewsPath, dashboardPath, children, signOut }) => {
  const classes = useStyles();

  return (
    <AppBar position="static" color="inherit">
      <Toolbar>

        <Typography className={classes.title} variant="h6" noWrap>
          {children}
        </Typography>
        {reviewsPath && <Link to='/reviews'>reviews</Link>}
        {dashboardPath && <Link to='/dashboard'>dashboard</Link>}
        <Button color="inherit" onClick={signOut}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
