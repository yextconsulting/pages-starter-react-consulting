import { useEffect, useState } from "react";
import ReviewStars from "src/components/entity/ReviewStars";
import ReviewCard from "src/components/cards/ReviewCard";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  Dot,
} from "pure-react-carousel";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { fetchReviews } from "src/components/entity/utils/fetchReviews";
import { useTemplateData } from "src/common/useTemplateData";
import { ReviewProfile } from "src/types/entities";

type ReviewsProps = {
  title?: string;
  maxReviews?: number;
  numReviewsPerPage?: number;
  name: string;
  entityId: string;
};

const Reviews = (props: ReviewsProps) => {
  const {
    title = "Recent Reviews",
    maxReviews = 12,
    numReviewsPerPage = 3,
    name,
    entityId,
  } = props;

  const [reviews, setReviews] = useState<ReviewProfile[]>([]);
  const { document } = useTemplateData();
  const apiKey = document._site.c_reviewsAPIKey;

  useEffect(() => {
    if (!apiKey) {
      console.error(
        "Add a Reviews API key to the Site Entity to enable the reviews component."
      );
      return;
    }
    fetchReviews(apiKey, entityId).then((r) => setReviews(r || []));
  }, [apiKey, entityId]);

  const averageRating = +(
    reviews.reduce((prev, curr) => prev + curr.rating, 0) / reviews.length
  ).toFixed(2);

  // Paginate the reviews so that there are {numReviewsPerPage} per page and a maximum of {maxReviews}.
  // Each page will be a separate slide in the carousel.
  const slides = new Array(
    Math.min(
      Math.ceil(reviews.length / numReviewsPerPage),
      Math.ceil(maxReviews / numReviewsPerPage)
    )
  )
    .fill(null)
    .map((_, slideNum) => (
      <div className="">
        {reviews.map(
          (review, idx) =>
            idx < (slideNum + 1) * numReviewsPerPage &&
            idx >= slideNum * numReviewsPerPage &&
            idx < maxReviews && (
              <ReviewCard key={idx} review={review} name={name} />
            )
        )}
      </div>
    ));

  if (!reviews.length) {
    return null;
  }

  return (
    <div className="py-8 sm:py-16">
      <div className="container">
        <div className="mb-12 sm:mb-16">
          <h2 className="Heading Heading--sub text-center mb-3">{title}</h2>
          <div className="flex justify-center">
            <span className="font-bold">{averageRating}</span>
            <ReviewStars rating={averageRating} className="mx-3" />
            <span>({reviews.length} reviews)</span>
          </div>
        </div>
        <div>
          <CarouselProvider
            className="relative"
            naturalSlideWidth={100}
            naturalSlideHeight={100}
            totalSlides={slides.length}
            visibleSlides={1}
            isIntrinsicHeight={true}
            currentSlide={0}
          >
            <div className="flex">
              <Slider>
                {slides.map((slide, idx) => (
                  <Slide index={idx} key={idx}>
                    {slide}
                  </Slide>
                ))}
              </Slider>
            </div>

            <div className="flex items-center justify-center mt-8">
              <ButtonBack className="my-auto w-6 h-6 mr-5 text-brand-primary disabled:text-brand-gray-300 disabled:cursor-default">
                <FaArrowLeft />
              </ButtonBack>
              {slides.map((_, idx) => (
                <Dot
                  slide={idx}
                  key={idx}
                  className="mx-3 w-8 h-8 disabled:bg-brand-gray-100 disabled:text-brand-primary disabled:cursor-default"
                >
                  {idx + 1}
                </Dot>
              ))}
              <ButtonNext className="my-auto w-6 h-6 ml-5 text-brand-primary disabled:text-brand-gray-300 disabled:cursor-default">
                <FaArrowRight />
              </ButtonNext>
            </div>
          </CarouselProvider>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
