import type { ReviewProfile } from "src/types/entities";
import { useTemplateData } from "src/common/useTemplateData";
import ReviewStars from "src/components/entity/ReviewStars";

type ReviewCardProps = {
  review: ReviewProfile;
  name: string;
};

const ReviewCard = (props: ReviewCardProps) => {
  const { review, name } = props;

  const { document } = useTemplateData();
  const formateDate = (date: string) =>
    new Date(date).toLocaleDateString(document.locale, {
      month: "long",
      day: "2-digit",
      year: "numeric",
    });

  return (
    <div className="py-6 sm:py-4 flex flex-col sm:flex-row border-t-[1px] border-brand-gray-300">
      <div className="sm:basis-1/3 sm:shrink-0">
        <div className="font-bold mb-2">{review.authorName}</div>
        <div>{formateDate(review.reviewDate)}</div>
      </div>
      <div>
        <div className="flex mb-2">
          <span className="font-bold mr-3">{review.rating}</span>
          <ReviewStars rating={review.rating} />
        </div>
        <div>{review.content}</div>
        {review.comments
          ? [0] && (
              <div className="mt-6">
                <div className="font-bold mb-1">{`Response from ${name}`}</div>
                <div className="mb-4 sm:mb-2">
                  {formateDate(review.comments[0].commentDate)}
                </div>
                <div>{review.comments[0].content}</div>
              </div>
            )
          : null}
      </div>
    </div>
  );
};

export default ReviewCard;
