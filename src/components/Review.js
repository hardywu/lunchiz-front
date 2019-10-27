import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
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

export default function Review({review={}, reviewer={}}) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.user}>
        <Typography component="h2">{reviewer.username}</Typography>
      </div>

      <div className={classes.review}>

        <div className={classes.rating}>
          <Rating value={Number(review.rate)} readOnly />
          <Box ml={2}>{review.date}</Box>
        </div>
        <div>{review.comment}
        </div>
        {
          review.reply &&
          <div className={classes.reply}>
            <Divider />
            <Typography component="span">Reply: </Typography>
            {review.reply}
          </div>
        }
      </div>
    </div>
  )
}
