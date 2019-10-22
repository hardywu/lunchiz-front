import React, { useState } from 'react';
import {
  Button, withStyles, Typography, FormControl, FormHelperText, TextField,
  CircularProgress,
} from '@material-ui/core';

const styles = theme => ({
  form: {
    maxWidth: 600,
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  active: {
    color: 'blue',
  },
  submit: {
    marginTop: theme.spacing(3),
  },
});

const SignUp = ({ classes, submit, loading, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const submitHandler = e => {
    e.preventDefault()
    if (password !== passwordConfirm) return;
    submit({email: email.replace(/\s/g, ''), password});
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
          onChange={e => setEmail(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
      </FormControl>
      <FormControl margin="normal" required fullWidth>
        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          placeholder="123123"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={e => setPassword(e.target.value)}
          autoComplete="current-password"
          variant="outlined"
        />
      </FormControl>
      <FormControl margin="normal" required fullWidth error>
        <TextField
          id="passwordConfirm"
          name="passwordConfirm"
          label="Password Confirmation"
          type="password"
          placeholder="123123"
          InputLabelProps={{
            shrink: true,
          }}
          value={passwordConfirm}
          onChange={e => setPasswordConfirm(e.target.value)}
          autoComplete="current-password"
          variant="outlined"
        />
        <FormHelperText
          hidden={!passwordConfirm || password === passwordConfirm}
        >
          passwords not match
        </FormHelperText>
      </FormControl>
      {error && <Typography color="error">{error}</Typography>}
      <Button
        disabled={loading}
        type="submit"
        fullWidth
        variant="outlined"
        color="primary"
        className={classes.submit}
      >
        { loading ? <CircularProgress /> : "Sign Up" }
      </Button>
    </form>
  );
}

export default withStyles(styles)(SignUp);
