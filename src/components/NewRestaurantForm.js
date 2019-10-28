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


const NewRestaurantForm = ({onSubmit, errors=[], loading=false}) => {
  const classes = useStyles();
  const [name, setName] = React.useState('');
  const [pristine, setPristine] = React.useState(true);
  const submitHandler = (e) => {
    e.preventDefault();
    onSubmit && onSubmit({name});
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
        value={name}
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
        { loading ? <CircularProgress /> : "Add Restaurant" }
      </Button>
    </form>)
}

export default NewRestaurantForm;
