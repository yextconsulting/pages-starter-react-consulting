import React from "react";
import { FAQItem } from "src/types/entities";
import { FAQ } from "src/components/entity/FAQ";

const defaultFields: string[] = [
  'c_fAQSection.title',
  'c_fAQSection.faqs.question',
  'c_fAQSection.faqs.answer',
];

type FAQsProps = {
  title: string;
  faqs: FAQItem[];
}

const FAQs = (props: FAQsProps) => {
  const { title, faqs } = props;

  return (
    <div className="FAQ container my-8">
      <h2 className="FAQ-heading font-bold text-4xl mb-8">
        {title}
      </h2>
      <div className="FAQ-content divide-y border-t border-b">
        {faqs.map(faq => (
          <FAQ key={faq.question} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
}

export {
  FAQs,
  defaultFields,
};
