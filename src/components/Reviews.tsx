
import { Link } from "@yext/sites-react-components";
import { CTA } from "@yext/types";
import React from "react";
import "src/styles/Reviews.css";

interface ReviewsProps {

}

function currentDate() {
  const date = new Date();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return months[date.getMonth()]+" "+date.getDate()+", "+date.getFullYear();
}

const Reviews = (props: ReviewsProps) => {

  return (
    <div className="Reviews">
      <div className="Reviews-container container">
        <div className="Reviews-title">
          Reviews
        </div>
        <div className="Reviews-review">
          <div className="Reviews-reviewContainer">
            <div className="Reviews-reviewText">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </div>
            <div className="Reviews-qnaContainer">
              <div className="Reviews-qna">
                <div className="Reviews-qnaQuestion">
                  Are you an existing client? (Y/N)
                </div>
                <div className="Reviews-qnaAnswer">
                  Yes.
                </div>
              </div>
              <div className="Reviews-qna">
                <div className="Reviews-qnaQuestion">
                  Do you have a conflict of interest with the advisor? (Y/N)
                </div>
                <div className="Reviews-qnaAnswer">
                  No.
                </div>
              </div>
              <div className="Reviews-qna">
                <div className="Reviews-qnaQuestion">
                  Have you received any compensation for leaving the review? (Y/N)
                </div>
                <div className="Reviews-qnaAnswer">
                  No.
                </div>
              </div>
              <div className="Reviews-qna">
                <div className="Reviews-qnaQuestion">
                  If Yes, provide a description of the material terms of compensation provided.
                </div>
                <div className="Reviews-qnaAnswer">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </div>
              </div>
            </div>
          </div>
          <div className="Reviews-reviewerContainer">
            <div className="Reviews-reviewerName">
              Name
            </div>
            <div className="Reviews-reviewDate">
              {currentDate()}
            </div>
            <div className="Reviews-verifiedClient">
              verified client
            </div>
          </div>
        </div>
        <div className="Reviews-review">
          <div className="Reviews-reviewContainer">
            <div className="Reviews-reviewText">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </div>
            <div className="Reviews-qnaContainer">
              <div className="Reviews-qna">
                <div className="Reviews-qnaQuestion">
                  Are you an existing client? (Y/N)
                </div>
                <div className="Reviews-qnaAnswer">
                  Yes.
                </div>
              </div>
              <div className="Reviews-qna">
                <div className="Reviews-qnaQuestion">
                  Do you have a conflict of interest with the advisor? (Y/N)
                </div>
                <div className="Reviews-qnaAnswer">
                  No.
                </div>
              </div>
              <div className="Reviews-qna">
                <div className="Reviews-qnaQuestion">
                  Have you received any compensation for leaving the review? (Y/N)
                </div>
                <div className="Reviews-qnaAnswer">
                  No.
                </div>
              </div>
              <div className="Reviews-qna">
                <div className="Reviews-qnaQuestion">
                  If Yes, provide a description of the material terms of compensation provided.
                </div>
                <div className="Reviews-qnaAnswer">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </div>
              </div>
            </div>
          </div>
          <div className="Reviews-reviewerContainer">
            <div className="Reviews-reviewerName">
              Name
            </div>
            <div className="Reviews-reviewDate">
              {currentDate()}
            </div>
            <div className="Reviews-verifiedClient">
              verified client
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;