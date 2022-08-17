import React from "react";
import "src/styles/Testimonials.css";

interface TestimonialsProps {

}

function currentDate() {
  const date = new Date();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return months[date.getMonth()]+" "+date.getDate()+", "+date.getFullYear();
}

const Testimonials = (props: TestimonialsProps) => {

  const qnaQuestionArr = ['Are you an existing client? (Y/N)', 'Do you have a conflict of interest with the advisor? (Y/N)', 'Have you received any compensation for leaving the review? (Y/N)', 'If Yes, provide a description of the material terms of compensation provided.'];
  const qnaAnswerArr = ['Yes.', 'No.', 'No.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'];

  function generateQNAElements(qnaQuestionArr: string[], qnaAnswerArr: string[]) {

    var qnaArrToReturn = [];

    for(var currQNANum = 0; currQNANum < qnaQuestionArr.length; currQNANum++) {

      qnaArrToReturn.push(
      <div className="Testimonials-qna lg:pr-2">
        <div className="Testimonials-qnaQuestion text-sm font-bold">
          {qnaQuestionArr[currQNANum]}
        </div>
        <div className="Testimonials-qnaAnswer text-sm font-normal">
          {qnaAnswerArr[currQNANum]}
        </div>
      </div>);
    }

    return qnaArrToReturn;
  }

  return (
    <div className="Testimonials">
      <div className="Testimonials-container container px-4">
        <div className="Testimonials-title text-2xl font-bold text-center my-8 lg:mt-16 lg:mb-12">
          Testimonials
        </div>
        <div className="Testimonials-review flex flex-col mb-6	lg:mb-8 lg:flex-row">
          <div className="Testimonials-reviewContainer p-6 lg:p-8">
            <div className="Testimonials-reviewText text-lg font-normal pb-6 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </div>
            <div className="Testimonials-qnaContainer flex flex-col lg:flex-row lg:flex-wrap">
              {generateQNAElements(qnaQuestionArr, qnaAnswerArr)}
            </div>
          </div>
          <div className="Testimonials-reviewerContainer p-6 lg:p-8">
            <div className="Testimonials-reviewerName font-bold">
              Name
            </div>
            <div className="Testimonials-reviewDate text-sm font-normal mb-4">
              {currentDate()}
            </div>
            <div className="Testimonials-verifiedClient text-lg font-bold">
              verified client
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;