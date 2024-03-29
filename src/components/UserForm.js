import React, { useState } from 'react';
import {
  Button, Typography, FormControl, FormHelperText, TextField,
  CircularProgress, Radio, RadioGroup, FormControlLabel, FormLabel,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
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
}));

const UserForm = ({
  onSubmit, loading, errors=[], email='', type='User', username='',
}) => {
  const classes = useStyles();
  const [emailField, setEmail] = useState(email);
  const [usernameField, setUsername] = useState(username);
  const [typeField, setType] = useState(type);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [pristine, setPristine] = useState(true);
  const submitHandler = e => {
    e.preventDefault()
    if (password !== passwordConfirm) return;
    let data = {};
    if (email !== emailField) data.email = emailField;
    if (type !== typeField) data.type = typeField;
    if (username !== usernameField) data.username = usernameField;
    if (!!password) data.password = password;
    onSubmit && onSubmit(data);
    setPristine(false);
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
          value={emailField}
          onChange={e => setEmail(e.target.value.replace(/\s/g, ''),)}
          InputLabelProps={{
            shrink: true,
          }}
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
          value={usernameField}
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
          onChange={e => setPassword(e.target.value)}
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
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">User Category</FormLabel>
        <RadioGroup
          aria-label="type" name="type" value={typeField}
          onChange={(e) => setType(e.target.value)}>
          <FormControlLabel value="User" control={<Radio />} label="User" />
          <FormControlLabel value="Owner" control={<Radio />} label="Owner" />
          <FormControlLabel value="Admin" control={<Radio />} label="Admin" />
        </RadioGroup>
      </FormControl>
      {
        !pristine && errors && errors.map(
          err => <Typography color="error" key={err}>{err}</Typography>)
      }
      <Button
        disabled={loading}
        type="submit"
        fullWidth
        variant="outlined"
        color="primary"
        className={classes.submit}
      >
        { loading ? <CircularProgress /> : "SAVE" }
      </Button>
    </form>
  );
}

export default UserForm;
