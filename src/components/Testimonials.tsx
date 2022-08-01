
import { Link } from "@yext/sites-react-components";
import { CTA } from "@yext/types";
import React from "react";
import "src/styles/Testimonials.css";

interface ReviewsProps {

}

function currentDate() {
  const date = new Date();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return months[date.getMonth()]+" "+date.getDate()+", "+date.getFullYear();
}

const Testimonials = (props: ReviewsProps) => {

  return (
    <div className="Testimonials">
      <div className="Testimonials-container container">
        <div className="Testimonials-title">
          Testimonials
        </div>
        <div className="Testimonials-review">
          <div className="Testimonials-reviewContainer">
            <div className="Testimonials-reviewText">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </div>
            <div className="Testimonials-qnaContainer">
              <div className="Testimonials-qna">
                <div className="Testimonials-qnaQuestion">
                  Are you an existing client? (Y/N)
                </div>
                <div className="Testimonials-qnaAnswer">
                  Yes.
                </div>
              </div>
              <div className="Testimonials-qna">
                <div className="Testimonials-qnaQuestion">
                  Do you have a conflict of interest with the advisor? (Y/N)
                </div>
                <div className="Testimonials-qnaAnswer">
                  No.
                </div>
              </div>
              <div className="Testimonials-qna">
                <div className="Testimonials-qnaQuestion">
                  Have you received any compensation for leaving the review? (Y/N)
                </div>
                <div className="Testimonials-qnaAnswer">
                  No.
                </div>
              </div>
              <div className="Testimonials-qna">
                <div className="Testimonials-qnaQuestion">
                  If Yes, provide a description of the material terms of compensation provided.
                </div>
                <div className="Testimonials-qnaAnswer">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </div>
              </div>
            </div>
          </div>
          <div className="Testimonials-reviewerContainer">
            <div className="Testimonials-reviewerName">
              Name
            </div>
            <div className="Testimonials-reviewDate">
              {currentDate()}
            </div>
            <div className="Testimonials-verifiedClient">
              verified client
            </div>
          </div>
        </div>
        <div className="Testimonials-review">
          <div className="Testimonials-reviewContainer">
            <div className="Testimonials-reviewText">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </div>
            <div className="Testimonials-qnaContainer">
              <div className="Testimonials-qna">
                <div className="Testimonials-qnaQuestion">
                  Are you an existing client? (Y/N)
                </div>
                <div className="Testimonials-qnaAnswer">
                  Yes.
                </div>
              </div>
              <div className="Testimonials-qna">
                <div className="Testimonials-qnaQuestion">
                  Do you have a conflict of interest with the advisor? (Y/N)
                </div>
                <div className="Testimonials-qnaAnswer">
                  No.
                </div>
              </div>
              <div className="Testimonials-qna">
                <div className="Testimonials-qnaQuestion">
                  Have you received any compensation for leaving the review? (Y/N)
                </div>
                <div className="Testimonials-qnaAnswer">
                  No.
                </div>
              </div>
              <div className="Testimonials-qna">
                <div className="Testimonials-qnaQuestion">
                  If Yes, provide a description of the material terms of compensation provided.
                </div>
                <div className="Testimonials-qnaAnswer">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </div>
              </div>
            </div>
          </div>
          <div className="Testimonials-reviewerContainer">
            <div className="Testimonials-reviewerName">
              Name
            </div>
            <div className="Testimonials-reviewDate">
              {currentDate()}
            </div>
            <div className="Testimonials-verifiedClient">
              verified client
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;