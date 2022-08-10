import React from "react";
import "src/styles/Reviews.css";
import { BsStarHalf, BsStarFill, BsStar } from "react-icons/bs";

interface ReviewsProps {

}

function currentDate() {
  const date = new Date();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return months[date.getMonth()]+" "+date.getDate()+", "+date.getFullYear();
}

function generateOverallStars(rating: number, numReviews: number) {
  const currentRating = rating;
  const maxRating = 5.0;
  var stars = [<div className="Reviews-overallRatingNumber">{currentRating}</div>];

  if(currentRating < maxRating) {

    var i = 0;
    while(i < Math.floor(currentRating)){
      stars.push(<BsStarFill className="Reviews-overallStar" />);
      i++;
    }
    if(currentRating%1 != 0) {
      stars.push(<BsStarHalf className="Reviews-overallStar" />);
      i++;
    }
    while(i < maxRating){
      stars.push(<BsStar className="Reviews-overallStar" />);
      i++;
    }

    stars.push(<div className="Reviews-overallRatingCount">({numReviews} reviews)</div>);
  }
  else {
    stars = [<div className="Reviews-overallRatingNumber">Invalid Rating</div>];
  }

  return stars;
}

function generateCurrentReviewStars(rating: number, numReviews: number) {
  const currentRating = rating;
  const maxRating = 5.0;
  var stars = [<div className="Reviews-ratingNumber">{currentRating}</div>];

  if(currentRating < maxRating) {

    var i = 0;
    while(i < Math.floor(currentRating)){
      stars.push(<BsStarFill className="Reviews-ratingStar" />);
      i++;
    }
    if(currentRating%1 != 0) {
      stars.push(<BsStarHalf className="Reviews-ratingStar" />);
      i++;
    }
    while(i < maxRating){
      stars.push(<BsStar className="Reviews-ratingStar" />);
      i++;
    }
  }
  else {
    stars = [<div className="Reviews-ratingNumber">Invalid Rating</div>];
  }

  return stars;
}

const Reviews = (props: ReviewsProps) => {

  return (
    <div className="Reviews">
      <div className="Reviews-container container">
        <div className="Reviews-titleAndRating">
            <div className="Reviews-title">
              Recent Reviews
            </div>
            {/* Ask Ben how to implement this */}
            <div className="Reviews-overallRating flex">
            {generateOverallStars(4.4, 21)}
            </div>
        </div>
        <div className="Reviews-review">
          <div className="Reviews-reviewerNameAndDate">
            <div className="Reviews-reviewerName">
                Name
            </div>
            <div className="Reviews-reviewDate">
                {currentDate()}
            </div>
          </div>
          <div className="Reviews-ratingAndResponse">
            {/* Ask Ben how to implement this */}
            <div className="Reviews-rating flex">
            {generateCurrentReviewStars(4.4, 21)}
            </div>
            <div className="Reviews-reviewText">
              Donec facilisis tortor ut augue lacinia, at viverra est semper. Sed sapien metus, scelerisque nec pharetra id, tempor a tortor. Pellentesque non dignissim neque. Ut porta viverra est, ut dignissim elit elementum ut.
            </div>

            {/* Ask Ben how to make this not always appear */}
            <div className="Reviews-businessResponse">
              <div className="Reviews-businessName">
                  Business Name
              </div>
              <div className="Reviews-responseDate">
                {currentDate()}
              </div>
              <div className="Reviews-responseText">
                Donec facilisis tortor ut augue lacinia, at viverra est semper. Sed sapien metus, scelerisque nec pharetra id, tempor a tortor.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;