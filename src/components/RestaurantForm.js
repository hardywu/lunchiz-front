import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button, TextField, FormControl, Typography, CircularProgress,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
}));


const RestaurantForm = ({onSubmit, name='', errors=[], loading=false}) => {
  const classes = useStyles();
  const [nameField, setName] = React.useState(name);
  const [pristine, setPristine] = React.useState(true);
  const submitHandler = (e) => {
    e.preventDefault();
    onSubmit && onSubmit({name: nameField});
    setPristine(false);
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <FormControl margin="normal" required>
      <TextField
        id="name"
        name="name"
        autoFocus
        label="name"
        placeholder="name"
        value={nameField}
        onChange={e => setName(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
      />
      </FormControl>
      {
        !pristine && errors && errors.map(
          err => <Typography color="error" key={err}>{err}</Typography>)
      }
      <Button disabled={loading} variant="outlined" type="submit">
        { loading ? <CircularProgress /> : "SAVE" }
      </Button>
    </form>)
}

export default RestaurantForm;
