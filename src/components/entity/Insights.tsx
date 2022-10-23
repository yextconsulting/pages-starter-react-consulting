import type { CTA, Image } from "@yext/types";
import { InsightCard, InsightCardFeatured } from "src/components/cards/InsightCard"
import { Link } from "@yext/pages/components";
import "src/components/entity/Insights.css";

const defaultFields: string[] = [
  'c_insightsSection.title',
  'c_insightsSection.cta',
  'c_insightsSection.insights.title',
  'c_insightsSection.insights.category',
  'c_insightsSection.insights.photo',
  'c_insightsSection.insights.date',
  'c_insightsSection.insights.descriptionLong',
  'c_insightsSection.insights.descriptionShort',
  'c_insightsSection.insights.cta',
];

interface InsightsProps {
  title: string;
  cta?: CTA,
  insights: InsightProps[];
}

interface InsightProps {
  title: string,
  category: string,
  photo?: Image,
  date: string,
  descriptionLong: string,
  descriptionShort: string,
  cta?: CTA
}

const Insights = (props: InsightsProps) => {
  const {title, cta, insights} = props;
  // First insight is blown up and features a picture
  const featuredInsight = insights[0]
  const listedInsights = insights.slice(1)
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
                image={featuredInsight.photo}/>
            </div>
          </div>
          {!!listedInsights.length && (
            <div className="md:w-1/2 md:ml-4 mt-6 md:mt-0">
              {listedInsights.map((item, i) => (
                <div key={i} className="Insights-insightCard">
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
  )
}

export {
  Insights,
  defaultFields,
}
