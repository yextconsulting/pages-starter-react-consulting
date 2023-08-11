import type { CTA } from "@yext/types";
import type { Insight } from "src/types/entities";
import {
  InsightCard,
  InsightCardFeatured,
} from "src/components/cards/InsightCard";
import { Link } from "@yext/sites-components";

interface InsightsProps {
  title: string;
  cta?: CTA;
  insights: Insight[];
}

const Insights = (props: InsightsProps) => {
  const { title, cta, insights } = props;
  // First insight is blown up and features a picture
  const featuredInsight = insights[0];
  const listedInsights = insights.slice(1);
  return (
    <div className="Insights py-8 sm:py-16 bg-brand-gray-100">
      <div className="container">
        <div className="Heading Heading--head mb-8">{title}</div>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 md:mr-4">
            <div className="border-b md:border-none">
              <InsightCardFeatured
                title={featuredInsight.title}
                category={featuredInsight.category}
                cta={featuredInsight.cta}
                date={featuredInsight.date}
                descriptionLong={featuredInsight.descriptionLong}
                image={featuredInsight.photo}
              />
            </div>
          </div>
          {!!listedInsights.length && (
            <div className="md:w-1/2 md:ml-4 md:-my-4">
              {listedInsights.map((item, i) => (
                <div key={i} className="py-4 border-b border-b-brand-gray-300">
                  <InsightCard
                    title={item.title}
                    category={item.category}
                    date={item.date}
                    descriptionShort={item.descriptionShort}
                    cta={item.cta}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        {cta && (
          <div className="flex mt-8 mb-6 justify-center">
            <Link className="Button Button--secondary" cta={cta} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Insights;
