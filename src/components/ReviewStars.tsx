import { FaStarHalfAlt, FaStar, FaRegStar } from "react-icons/fa";
import c from "classnames";

interface ReviewStarsProps {
  rating: number;
  className?: string;
  maxRating?: number;
}

const ReviewStars = (props: ReviewStarsProps) => {
  const { className, maxRating = 5, rating } = props;

  return (
    <div
      className={c("flex items-center gap-0.5 text-brand-primary", className)}
    >
      {new Array(maxRating)
        .fill(null)
        .map((_, i) =>
          rating - i >= 0.75 ? (
            <FaStar key={i} />
          ) : rating - i >= 0.25 ? (
            <FaStarHalfAlt key={i} />
          ) : (
            <FaRegStar key={i} />
          )
        )}
    </div>
  );
};

export default ReviewStars;
