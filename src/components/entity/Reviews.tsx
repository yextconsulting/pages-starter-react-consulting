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
import { LocationProfile, ReviewProfile } from "src/types/entities";
import ErrorBoundaryWithAnalytics from "../common/ErrorBoundaryWithAnalytics";

type ReviewsProps = {
  maxReviews?: number;
  numReviewsPerPage?: number;
};

const Reviews = (props: ReviewsProps) => {
  const templateData = useTemplateData();
  const profile = templateData.document as LocationProfile;
  const reviews = profile.c_reviewsSection;

  // TODO: move reviews API fetching into this template

  return (
    <ErrorBoundaryWithAnalytics name="reviews">
      <ReviewsLayout
        title={reviews?.title}
        name={profile.name}
        entityId={profile.id}
        maxReviews={props.maxReviews}
        numReviewsPerPage={props.numReviewsPerPage}
      />
    </ErrorBoundaryWithAnalytics>
  );
};

type ReviewsLayoutProps = ReviewsProps & {
  title?: string;
  name: string;
  entityId: string;
};

const ReviewsLayout = (props: ReviewsLayoutProps) => {
  const {
    title = "Recent Reviews",
    maxReviews = 12,
    numReviewsPerPage = 3,
    name,
    entityId,
  } = props;

  const [reviews, setReviews] = useState<ReviewProfile[]>([]);
  const apiKey = YEXT_PUBLIC_REVIEWS_API_KEY;

  useEffect(() => {
    if (!apiKey) {
      console.error(
        "Add a Reviews API key to the .env file or as a site variable to enable the reviews component."
      );
      return;
    }
    fetchReviews(apiKey, entityId).then((reviews) => {
      reviews.sort((a, b) => (a.reviewDate < b.reviewDate ? 1 : -1));
      setReviews(reviews || []);
    });
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
          <h2 className="heading heading-sub text-center mb-3">{title}</h2>
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
                  <Slide index={idx} key={idx} classNameHidden="!h-0">
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
