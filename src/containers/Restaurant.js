import React from 'react';
import { connect } from 'react-redux';
import { Link, Router } from "@reach/router";
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import { signOut, doFetchRestaurant, doFetchMyReview } from '../actions';
import { globalRecords } from '../utils';
import ReviewList from './ReviewList';
import Navbar from '../components/Navbar';
import CreateReview from './CreateReview';
import MyReview from './MyReview';

const getMyReviewId = rest => rest && rest.canReview && rest.myReviewId
const getMyReview = rest => getMyReviewId(rest) &&
  globalRecords[`review_${getMyReviewId(rest)}`]

const useStyles = makeStyles(theme => ({
  rating: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  nav: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const Restaurant = ({
  storeId, restaurant, fetchRestaurant, fetchMyReview, myReview, signOut,
}) => {
  const classes = useStyles()
  React.useEffect(() => {
    fetchRestaurant(storeId)
  }, [fetchRestaurant, storeId]);

  if (restaurant)  return (
    <div>
      <Navbar signOut={signOut}>
        <Link to="/">REVIEW</Link>
      </Navbar>
      <Container maxWidth="lg" >
        <Typography component="h1" variant="h5">{restaurant.name}</Typography>
        <div className={classes.rating}>
          <Rating value={Number(restaurant.rateAvg)} readOnly />
          <Box ml={2}>{restaurant.reviewsCount} reviews</Box>
        </div>
        {
          restaurant.myReviewId &&
          <Button component={Link} to='myReview' variant="outlined">
            My review
          </Button>
        }
        {
          restaurant.canReview && !restaurant.myReviewId &&
          <Button component={Link} to='newReview' variant="outlined">
            Write a review
          </Button>
        }
        <div className={classes.nav}>
          <Button component={Link} to='./'>latest reviews</Button>
          <Button component={Link} to='highestReviews'>highest reviews</Button>
          <Button component={Link} to='lowestReviews'>lowest reviews</Button>
        </div>
        <Router>
          <ReviewList path="/"  />
          <ReviewList path="highestReviews" orderByRate='desc' />
          <ReviewList path="lowestReviews" orderByRate='asc' />
          <CreateReview path="newReview"  />
          <MyReview path="myReview" />
        </Router>
      </Container>
    </div>
  );

  return <CircularProgress />

}

export default connect((state, { storeId }) => ({
  isAuthed: state.auth.signedIn,
  restaurant: globalRecords[`store_${storeId}`],
  myReview: getMyReview(globalRecords[`store_${storeId}`]),
}), (dispatch) => ({
  signOut: () => dispatch(signOut()),
  fetchRestaurant: (id) => dispatch(doFetchRestaurant(id)),
  fetchMyReview: id => dispatch(doFetchMyReview(id)),
}))(Restaurant);
