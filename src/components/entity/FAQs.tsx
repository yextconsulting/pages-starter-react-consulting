import type { FAQProfile } from "src/types/entities";
import FAQ from "src/components/entity/FAQ";

type FAQsProps = {
  title: string;
  faqs: FAQProfile[];
};

const FAQs = (props: FAQsProps) => {
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
