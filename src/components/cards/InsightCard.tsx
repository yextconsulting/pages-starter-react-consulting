import { Image, Link, type CTA, type ImageType } from "@yext/pages-components";
import { FaChevronRight } from "react-icons/fa";

export interface InsightCardProps {
  title: string;
  category?: string;
  date?: string;
  descriptionShort?: string;
  cta?: CTA;
}

export interface InsightCardFeaturedProps {
  image?: ImageType;
  descriptionLong?: string;
}

export function InsightCard(props: InsightCardProps) {
  const { title, category, date, descriptionShort, cta } = props;

  return (
    <div>
      {category && date && (
        <div>
          <span>{category}</span>
          <span className="ml-5 mr-5">|</span>
          <span>{date}</span>
        </div>
      )}
      <div className="heading heading-sub mt-4">{title}</div>
      {descriptionShort && <div className="mt-4">{descriptionShort}</div>}
      {cta?.label && cta.link && (
        <div className="flex mt-8 mb-6">
          <Link className="link-primary flex items-center" href={cta.link}>
            {cta.label}
            <FaChevronRight className="text-blue-500 ml-2" />
          </Link>
        </div>
      )}
    </div>
  );
}

export function InsightCardFeatured(
  props: InsightCardProps & InsightCardFeaturedProps
) {
  const { title, category, date, cta, image, descriptionLong } = props;

  return (
    <div>
      {image && (
        <div className="flex justify-center mb-8">
          <Image layout="fill" image={image} />
        </div>
      )}
      <InsightCard
        title={title}
        category={category}
        date={date}
        cta={cta}
        descriptionShort={descriptionLong}
      />
    </div>
  );
}
