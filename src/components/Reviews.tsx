
import { Link } from "@yext/sites-react-components";
import { CTA } from "@yext/types";
import React from "react";
import "../styles/Reviews.css";

interface ReviewsProps {

}

function currentYear() {
  return new Date().getFullYear();
}

const Reviews = (props: ReviewsProps) => {

  return (
    <div className="Reviews">
      THIS NEW THING SHOULD SHOW UP NOW :D
    </div>
  );
};

export default Reviews;