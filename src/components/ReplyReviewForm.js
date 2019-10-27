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
  reviewer={},
}) => {
  const classes = useStyles();
  const [replyField, setReply] = React.useState(reply);
  const submitHandler = (e) => {
    e.preventDefault();
    onSubmit && onSubmit({ reply: replyField});
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.user}>
        <Typography component="h2">{reviewer.username}</Typography>
      </div>

      <div className={classes.review}>
        <div className={classes.rating}>
          <Rating value={Number(rate)} readOnly />
          <Box ml={2}>{date}</Box>
        </div>
        <div>{comment}</div>
      </div>
      <FormControl margin="normal" required fullWidth>
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
      <Button variant="outlined" type="submit">SAVE</Button>
    </form>)
}

export default ReviewForm;
