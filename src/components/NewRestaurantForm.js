import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button, TextField,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
  },
}));


const NewRestaurantForm = ({onSubmit}) => {
  const classes = useStyles();
  const [name, setName] = React.useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    onSubmit && onSubmit({name});
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
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
      <Button type="submit">Add Restaurant</Button>
    </form>)
}

export default NewRestaurantForm;
