import type { Image as ImageType } from "@yext/types";
import { Image } from "@yext/sites-components";
import InsightCard, { InsightCardProps } from "./InsightCard";

export interface InsightCardFeaturedProps {
  image?: ImageType;
  descriptionLong?: string;
}

export default function InsightCardFeatured(
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
