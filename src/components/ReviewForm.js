import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button, Typography, TextField, Box, FormControl,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import format from 'date-fns/format';

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    marginTop: theme.spacing(1),
    display: 'flex',
  },
  user: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(4),
  },
  review: {
  },
  rating: {
    display: 'flex',
    alignItems: 'center',
  },
  reply: {
    paddingLeft: theme.spacing(4),
  }
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
      <FormControl margin="normal" required>
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
      </FormControl>
      <FormControl margin="normal" required>
      <TextField
        id="reply"
        name="reply"
        autoFocus
        label="reply"
        placeholder="reply"
        value={replyField}
        onChange={e => setReply(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
      />
      </FormControl>
      <FormControl margin="normal" required>
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
      </FormControl>
      <Button variant="outlined" type="submit">SAVE</Button>
    </form>)
}

export default ReviewForm;
