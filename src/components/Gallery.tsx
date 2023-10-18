import { Image } from "@yext/sites-components";
import type {
  Image as ImageType,
  ComplexImage as ComplexImageType,
} from "@yext/types";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  Dot,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import c from "classnames";

type GalleryProps = {
  images: (ImageType | ComplexImageType)[];
  title?: string;
  hideArrows?: boolean;
  hideNav?: boolean;
};

const Gallery = (props: GalleryProps) => {
  const arrowSVG = (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="currentColor"
        d="M20.7617 39.8137L21.3957 39.1798C21.8159 38.7596 21.8159 38.0783 21.3957 37.658L5.39089 21.6532H39.0952C39.6894 21.6532 40.1712 21.1714 40.1712 20.5772V19.6805C40.1712 19.0863 39.6894 18.6045 39.0952 18.6045H5.39089L21.3957 2.5997C21.8159 2.17952 21.8159 1.49824 21.3957 1.07798L20.7617 0.444037C20.3415 0.0238625 19.6602 0.0238625 19.2401 0.444037L0.31597 19.368C-0.104205 19.7882 -0.104205 20.4695 0.31597 20.8898L19.2401 39.8138C19.6602 40.234 20.3415 40.234 20.7617 39.8137Z"
      />
    </svg>
  );
  const showControls = !props.hideArrows || !props.hideNav;

  return (
    <div className="Gallery bg-brand-gray-100 py-8 sm:py-16">
      <div className="container">
        {props.title && (
          <h2 className="Heading Heading--head text-center mb-8">
            {props.title}
          </h2>
        )}

        <CarouselProvider
          className="relative"
          naturalSlideWidth={100} // Sets fixed aspect ratio for slides, required but disabled with `isIntrensicHeight`
          naturalSlideHeight={100} // Sets fixed aspect ratio for slides, required but disabled with `isIntrensicHeight`
          totalSlides={props.images.length}
          isIntrinsicHeight={true}
        >
          <Slider className={c({ "sm:mx-16": !props.hideArrows })}>
            {props.images.map((image, idx) => (
              <Slide index={idx} key={idx}>
                <Image
                  className="m-auto w-full h-full object-cover"
                  image={image}
                />
              </Slide>
            ))}
          </Slider>

          {showControls && (
            <div className="flex align-center mt-8 h-6 sm:h-1">
              {!props.hideArrows && (
                <div className="absolute left-0 sm:top-1/2 sm:-translate-y-1/2 w-full flex justify-between">
                  <ButtonBack className="w-6 h-6 sm:w-10 sm:h-10 text-brand-primary disabled:text-brand-gray-300 disabled:cursor-default">
                    {arrowSVG}
                  </ButtonBack>
                  <ButtonNext className="w-6 h-6 sm:w-10 sm:h-10 rotate-180 text-brand-primary disabled:text-brand-gray-300 disabled:cursor-default">
                    {arrowSVG}
                  </ButtonNext>
                </div>
              )}

              {!props.hideNav && (
                <div
                  className={c("flex justify-center items-center w-full", {
                    "mx-7 sm:mx-0": !props.hideArrows,
                  })}
                >
                  {props.images.map((_, idx) => {
                    const afterStyles =
                      "after:content-[' '] after:py-2 after:block after:relative after:-top-1";
                    return (
                      <Dot
                        slide={idx}
                        key={idx}
                        className={`mx-2 basis-0 flex-grow max-w-[theme(spacing.16)] h-1 rounded-full bg-brand-gray-300 disabled:bg-brand-primary disabled:cursor-default ${afterStyles}`}
                      ></Dot>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </CarouselProvider>
      </div>
    </div>
  );
};

export default Gallery;
