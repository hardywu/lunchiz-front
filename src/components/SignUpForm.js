import React, { useState } from 'react';
import {
  Button, withStyles, Typography, FormControl, FormHelperText, TextField,
  CircularProgress, Radio, RadioGroup, FormControlLabel, FormLabel,
} from '@material-ui/core';
import { validateEmail } from '../utils';

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

const SignUp = ({ classes, onSubmit, loading=false, errors=[] }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [username, setUsername] = useState('');
  const [type, setType] = useState('User');
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [pwdNotConfirmed, setPwdNotConfirmed] = useState(false);
  const emailSetter = (e) => {
    setEmail(e.target.value);
    setEmailInvalid(!validateEmail(e.target.value))
  }
  const passwordSetter = e => {
    setPassword(e.target.value);
    setPwdNotConfirmed(e.target.value !== confirm);
  }
  const confirmSetter = e => {
    setConfirm(e.target.value);
    setPwdNotConfirmed(password !== e.target.value);
  }
  const submitHandler = e => {
    e.preventDefault()
    onSubmit({email: email.replace(/\s/g, ''), password, username, type});
  }

  return (
    <form className={classes.form} noValidate onSubmit={submitHandler}>
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
          id="username"
          name="username"
          autoFocus
          label="username"
          placeholder="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          required
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
          onChange={passwordSetter}
          autoComplete="current-password"
          variant="outlined"
        />
      </FormControl>
      <FormControl margin="normal" required fullWidth error>
        <TextField
          id="confirm"
          name="confirm"
          label="Password Confirmation"
          type="password"
          placeholder="123123"
          InputLabelProps={{
            shrink: true,
          }}
          value={confirm}
          onChange={confirmSetter}
          autoComplete="current-password"
          variant="outlined"
          error={pwdNotConfirmed}
        />
        <FormHelperText
          hidden={!pwdNotConfirmed}
        >
          passwords not match
        </FormHelperText>
      </FormControl>
      {
        errors.map(
          err => <Typography color="error" key={err}>{err}</Typography>)
      }
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">You are a?</FormLabel>
        <RadioGroup
          aria-label="type" name="type" value={type}
          onChange={(e) => setType(e.target.value)}>
          <FormControlLabel value="User" control={<Radio />} label="User" />
          <FormControlLabel
            value="Owner" control={<Radio />}
            label="Restaurant Owner"
          />
        </RadioGroup>
      </FormControl>
      <Button
        disabled={loading || emailInvalid || pwdNotConfirmed}
        type="submit"
        fullWidth
        variant="outlined"
        color="primary"
        className={classes.submit}
      >
        { loading ? <CircularProgress /> : "REGISTER" }
      </Button>
    </form>
  );
}

export default withStyles(styles)(SignUp);
