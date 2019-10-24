import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button, Typography, TextField, Box,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import format from 'date-fns/format';

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
  },
}));


const NewReviewForm = ({onSubmit}) => {
  const classes = useStyles();
  const [comment, setComment] = React.useState('');
  const [rate, setRate] = React.useState(3);
  const [date, setDate] = React.useState(format(new Date(), 'yyyy-MM-dd'));
  const submitHandler = (e) => {
    e.preventDefault();
    onSubmit && onSubmit({rate, date, comment});
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Rate</Typography>
        <Rating
          name="simple-controlled"
          value={rate}
          onChange={(event, newValue) => {
            setRate(newValue);
          }}
        />
      </Box>
      <TextField
        id="comment"
        name="comment"
        autoFocus
        label="comment"
        placeholder="comment"
        value={comment}
        onChange={e => setComment(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
      />
      <TextField
        id="date"
        name="date"
        type="date"
        format="yyyy-MM-dd"
        label="date of visit"
        value={date}
        onChange={e => setDate(e.target.value)}
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button type="submit">Create Review</Button>
    </form>)
}

export default NewReviewForm;
