import React from 'react';
import { connect } from 'react-redux';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import { amber } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import { dismissErrMsg } from '../actions';


const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5),
  },
  root: {
    backgroundColor: theme.palette.error.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

function ConsecutiveSnackbars({variant, onClose, message}) {
  const classes = useStyles();
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    onClose && onClose();
  };

  return (
    <Snackbar
      classes={{root: classes[variant]}}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={!!message}
      autoHideDuration={1000}
      onClose={handleClose}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={
        <span id="message-id">
          <ErrorIcon className={classes.icon} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          className={classes.close}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>,
      ]}
    />
  );
}

export default connect(state => ({
  message: state.errMsg,
}), (dispatch) => ({
  onClose: () => dispatch(dismissErrMsg()),
}))(ConsecutiveSnackbars);
