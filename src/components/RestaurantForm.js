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


const RestaurantForm = ({onSubmit, name=''}) => {
  const classes = useStyles();
  const [nameField, setName] = React.useState(name);
  const submitHandler = (e) => {
    e.preventDefault();
    onSubmit && onSubmit({name: nameField});
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
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
      <Button type="submit">SAVE</Button>
    </form>)
}

export default RestaurantForm;
