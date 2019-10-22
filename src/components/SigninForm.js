import React, { useState } from 'react';
import {
  Button, withStyles, Typography, FormControl, FormHelperText, TextField,
} from '@material-ui/core';

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

const SignIn = ({ classes, submit, loading, error }) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const submitHandler = e => {
    e.preventDefault()
    submit({email, password})
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
          placeholder="123123"
          InputLabelProps={{
            shrink: true,
          }}
          value={password}
          onChange={e => setPassword(e.target.value)}
          autoComplete="current-password"
          variant="outlined"
        />
      </FormControl>
      {error && <Typography color="error">{error}</Typography>}
      <Button
        disabled={loading}
        type="submit"
        fullWidth
        color="primary"
        variant="outlined"
        className={classes.submit}
      >
        Sign IN
      </Button>
    </form>
  );
}

export default withStyles(styles)(SignIn);
