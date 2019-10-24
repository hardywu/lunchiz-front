import React from 'react';

const Review = (props) => {
  const { review } = props;
  return (
    <div>
      {review.date}:
      {review.comment} :
      {review.rate}
    </div>
  );
}

export default Review;
