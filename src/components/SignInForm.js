import React, { useState } from 'react';
import {
  Button, Typography, FormControl, TextField, CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { validateEmail } from '../utils';

const useStyles = makeStyles(theme => ({
  form: {
    maxWidth: 600,
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    marginTop: theme.spacing( 3),
  },
}));

export default function SignIn({ onSubmit, loading=false, errors=[] }) {
  const classes = useStyles();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [pristine, setPristine] = useState(true);
  const emailSetter = (e) => {
    setEmail(e.target.value);
    setEmailInvalid(!validateEmail(e.target.value))
  }
  const submitHandler = e => {
    e.preventDefault()
    onSubmit(email, password)
    setPristine(false);
  }

  return (
    <form className={classes.form} noValidate onSubmit={submitHandler}>
      {
        !pristine && errors && errors.map(err =>
          (<Typography color="error" key={err}>{err}</Typography>))
      }
      <FormControl margin="normal" required fullWidth>
        <TextField
          id="email"
          name="email"
          autoFocus
          label="email"
          placeholder="email"
          value={email}
          onChange={emailSetter}
          InputLabelProps={{
            shrink: true,
          }}
          error={emailInvalid}
          variant="outlined"
        />
      </FormControl>
      <FormControl margin="normal" required fullWidth>
        <TextField
          id="password"
          name="password"
          label="Password"
          placeholder="Password"
          InputLabelProps={{
            shrink: true,
          }}
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          autoComplete="current-password"
          variant="outlined"
        />
      </FormControl>
      <Button
        disabled={loading || emailInvalid}
        type="submit"
        fullWidth
        color="primary"
        variant="outlined"
        className={classes.submit}
      >
        { loading ? <CircularProgress /> : "SIGN IN" }
      </Button>
    </form>
  );
}
