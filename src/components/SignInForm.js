import React, { useState } from 'react';
import {
  Button, withStyles, Typography, FormControl, FormHelperText, TextField,
} from '@material-ui/core';
import { validateEmail } from '../utils';

const styles = theme => ({
  form: {
    maxWidth: 600,
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    marginTop: theme.spacing( 3),
  },
});

const SignIn = ({ classes, onSubmit, loading=false, errors=[] }) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [emailInvalid, setEmailInvalid] = useState(false);
  const emailSetter = (e) => {
    setEmail(e.target.value);
    setEmailInvalid(!validateEmail(e.target.value))
  }
  const submitHandler = e => {
    e.preventDefault()
    onSubmit(email, password)
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
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
      {
        errors.map(err =>
          (<Typography color="error" key={err}>{err}</Typography>))
      }
      <Button
        disabled={loading || emailInvalid}
        type="submit"
        fullWidth
        color="primary"
        variant="outlined"
        className={classes.submit}
      >
        SIGN IN
      </Button>
    </form>
  );
}

export default withStyles(styles)(SignIn);
