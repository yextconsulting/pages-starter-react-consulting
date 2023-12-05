import type { FAQProfile, LocationProfile } from "src/types/entities";
import FAQ from "src/components/entity/FAQ";
import { useTemplateData } from "src/common/useTemplateData";
import ErrorBoundaryWithAnalytics from "../common/ErrorBoundaryWithAnalytics";

const FAQs = () => {
  const templateData = useTemplateData();
  const profile = templateData.document as LocationProfile;
  const faq = profile.c_faqSection;

  if (faq?.title && faq?.faqs) {
    return (
      <ErrorBoundaryWithAnalytics name="faqs">
        <FAQsLayout title={faq.title} faqs={faq.faqs} />
      </ErrorBoundaryWithAnalytics>
    );
  }

  return null;
};

type FAQsLayoutProps = {
  title: string;
  faqs: FAQProfile[];
};

const FAQsLayout = (props: FAQsLayoutProps) => {
  const { title, faqs } = props;

  return (
    <div className="FAQ bg-brand-gray-100 py-8 sm:py-16">
      <div className="container">
        <h2 className="Heading Heading--sub font-bold mb-8">{title}</h2>
        <div className="divide-y border-t border-b">
          {faqs.map((faq) => (
            <FAQ
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;
