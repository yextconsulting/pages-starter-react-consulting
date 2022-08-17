import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import "src/styles/Reviews.css";
import { BsStarHalf, BsStarFill, BsStar } from "react-icons/bs";
interface ReviewsProps {

}

const Reviews = (props: ReviewsProps) => {

  function currentDate(reviewDate: string) {

    const date = new Date(reviewDate);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months[date.getMonth()]+" "+date.getDate()+", "+date.getFullYear();

  }
  
  function generateOverallStars(rating: number, numReviews: number) {

    const currentRating = rating;
    const maxRating = 5.0;
    let stars = [<div className="Reviews-overallRatingNumber mr-3 font-bold text-base">{currentRating}</div>];
  
    if(currentRating <= maxRating) {
  
      let currentStarNum = 0;

      while(currentStarNum < Math.floor(currentRating)){
        stars.push(<BsStarFill className="Reviews-overallStarFilled my-auto" />);
        currentStarNum++;
      }

      if(currentRating % 1 != 0) {
        stars.push(<BsStarHalf className="Reviews-overallStarHalf my-auto" />);
        currentStarNum++;
      }

      while(currentStarNum < maxRating){
        stars.push(<BsStar className="Reviews-overallStar my-auto" />);
        currentStarNum++;
      }
  
      stars.push(<div className="Reviews-overallRatingCount ml-3 font-normal text-base">({numReviews} reviews)</div>);

    }
    else {

      stars = [<div className="Reviews-overallRatingNumber">Invalid Rating</div>];

    }
  
    return stars;

  }
  
  function generateCurrentReviewStars(rating: number) {

    const currentRating = rating;
    const maxRating = 5.0;
    let stars = [<div className="Reviews-ratingNumber mr-3 font-bold text-base">{currentRating}</div>];
  
    if(currentRating <= maxRating) {
  
      let currentStarNum = 0;

      while(currentStarNum < Math.floor(currentRating)){
        stars.push(<BsStarFill className="Reviews-ratingStarFilled my-auto" />);
        currentStarNum++;
      }

      if(currentRating % 1 != 0) {
        stars.push(<BsStarHalf className="Reviews-ratingStarHalf my-auto" />);
        currentStarNum++;
      }

      while(currentStarNum < maxRating){
        stars.push(<BsStar className="Reviews-ratingStar my-auto" />);
        currentStarNum++;
      }

    }
    else {

      stars = [<div className="Reviews-ratingNumber">Invalid Rating</div>];

    }
  
    return stars;

  }
  
  function generateReviews(currentReviews: any)
  {

    const reviewsArrToReturn = [];
  
    for(var currentReviewNum = 0; currentReviewNum < currentReviews.length; currentReviewNum++){

      if(currentReviews[currentReviewNum].comments != null) {

        reviewsArrToReturn.push(
          <div className="Reviews-review pt-6 flex flex-col lg:flex-row" key={currentReviews[currentReviewNum].$key.primary_key}>
            <div className="Reviews-reviewerNameAndDate lg:w-1/2">
              <div className="Reviews-reviewerName font-bold text-lg mb-2">
                {currentReviews[currentReviewNum].authorName}
              </div>
              <div className="Reviews-reviewDate text-base mb-4">
                {currentDate(currentReviews[currentReviewNum].reviewDate)}
              </div>
            </div>

            <div className="Reviews-ratingAndResponse">
              <div className="Reviews-rating flex mb-2">
                {generateCurrentReviewStars(currentReviews[currentReviewNum].rating)}
              </div>
              <div className="Reviews-reviewText text-base mb-6">
                {currentReviews[currentReviewNum].content}
              </div>

              <div className="Reviews-businessResponse">
                <div className="Reviews-businessName font-bold text-lg mb-2">
                {currentReviews[currentReviewNum].entity.name}
                </div>
                <div className="Reviews-responseDate text-base mb-4 lg:mb-2">
                  {currentDate(currentReviews[currentReviewNum].comments[0].commentDate)}
                </div>
                <div className="Reviews-responseText text-base mb-6">
                  {currentReviews[currentReviewNum].comments[0].content}
                </div>
              </div>
            </div>
          </div>

        );

      }
      else {

        reviewsArrToReturn.push(
          <div className="Reviews-review pt-6 flex flex-col lg:flex-row" key={currentReviews[currentReviewNum].$key.primary_key}>
            <div className="Reviews-reviewerNameAndDate lg:w-1/2">
              <div className="Reviews-reviewerName font-bold text-lg mb-2">
                {currentReviews[currentReviewNum].authorName}
              </div>
              <div className="Reviews-reviewDate text-base mb-4">
                {currentDate(currentReviews[currentReviewNum].reviewDate)}
              </div>
            </div>
            <div className="Reviews-ratingAndResponse">
              <div className="Reviews-rating flex mb-2">
                {generateCurrentReviewStars(currentReviews[currentReviewNum].rating)}
              </div>
              <div className="Reviews-reviewText text-base mb-6">
                {currentReviews[currentReviewNum].content}
              </div>
            </div>
          </div>
        );
      }
    }

    return reviewsArrToReturn;

  }

  function PaginatedReviews() {
    // We start with an empty list of items.
    const [allPageTokens, setAllPageTokens] = useState(['']);
    const [pageNumber, setPageNumber] = useState(0);
    const [currentReviews, setCurrentReviews] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const limitOfReviews = 4;
    const APICallURL = "https://streams-sbx.yext.com/v2/accounts/me/api/reviews?v=20220101&api_key=ae79e8eb05e10f03917d3f4836863ac7&entity.id=322312743840815756";
  
    useEffect(() => {

      const APICallURLWithLimit = APICallURL.concat("", "&limit=", limitOfReviews.toString())
      const resp: any = fetch(APICallURLWithLimit)
        .then(resp => resp.json())
        .then(resp => {
          setPageCount(Math.ceil(resp.response.count/limitOfReviews))
          allPageTokens.push(resp.response.nextPageToken);
          setAllPageTokens(allPageTokens);
          setCurrentReviews(resp.response.docs);
        })

    }, [])

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {

      if(event.selected >= 1) {

        let APICallURLWithLimitAndToken = APICallURL.concat("", "&limit=", limitOfReviews.toString(), "&pageToken=", allPageTokens[allPageTokens.length - 1])

        const resp: any = fetch(APICallURLWithLimitAndToken)
        .then(resp => resp.json())
        .then(resp => {
          allPageTokens.push(resp.response.nextPageToken);
          setAllPageTokens(allPageTokens);
        })

      }

      const APICallURLWithLimitAndToken = APICallURL.concat("", "&limit=", limitOfReviews.toString(), "&pageToken=", allPageTokens[event.selected])

      const resp: any = fetch(APICallURLWithLimitAndToken)
      .then(resp => resp.json())
      .then(resp => {
        setCurrentReviews(resp.response.docs);
      })

    }

    return (
      <>
        <div className="Reviews-container">
          {generateReviews(currentReviews)}
        </div>
        {<ReactPaginate
        breakLabel=". . ."
        nextLabel=""
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel=""
        renderOnZeroPageCount={null}
        containerClassName="Reviews-pageNumbersContainer flex mt-10 justify-center"
        pageClassName="Reviews-pageNumber px-4 py-2"
        pageLinkClassName="Reviews-pageNumberLink font-bold text-sm"
        breakClassName="Reviews-break font-bold text-xl mt-auto mb-1.5"
        breakLinkClassName="Reviews-breakLink"
        activeClassName="Reviews-activePageNumber"
        activeLinkClassName="Reviews-activePageNumberLink"
        previousClassName="Reviews-previousButton flex"
        nextClassName="Reviews-nextButton flex"
        previousLinkClassName="Reviews-previousButtonLink my-auto mr-3 h-6 w-6"
        nextLinkClassName="Reviews-nextButtonLink my-auto ml-3 h-6 w-6"
        disabledClassName="Reviews-disabledButton"
        disabledLinkClassName="Reviews-disabledButtonLink"
      /> }
      </>
    );

  }

  return (
    <div className="Reviews container px-4">
      <div className="Reviews-titleAndRating text-center pb-8 mt-8">
        <div className="Reviews-title mb-3 font-bold text-2xl">
          Recent Reviews
        </div>
        {/* Ask Ben how to implement this */}
        <div className="Reviews-overallRating flex justify-center">
        {generateOverallStars(4.4, 21)}
        </div>
      </div>
      {<PaginatedReviews />}
    </div>
  );
};

export default Reviews;