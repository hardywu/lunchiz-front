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


const ReviewForm = ({
  onSubmit, rate=3, comment='', reply='', date=format(new Date(), 'yyyy-MM-dd'),
}) => {
  const classes = useStyles();
  const [commentField, setComment] = React.useState(comment);
  const [rateField, setRate] = React.useState(rate);
  const [replyField, setReply] = React.useState(reply);
  const [dateField, setDate] = React.useState(date);
  const submitHandler = (e) => {
    e.preventDefault();
    onSubmit && onSubmit({rate: rateField, date: dateField, comment: commentField});
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Rate</Typography>
        <Rating
          name="simple-controlled"
          value={rateField}
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
        value={commentField}
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
        value={dateField}
        onChange={e => setDate(e.target.value)}
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button type="submit">Save</Button>
    </form>)
}

export default ReviewForm;
