import React from "react";
import { FAQItem } from "src/types/entities";
import FAQ from "src/components/FAQs/FAQ";

type FAQsProps = {
    heading: string;
    fAQs: FAQItem[];
}

const FAQs = (props: FAQsProps) => {
    const { heading, fAQs } = props;

    return (
        <div className="FAQ container my-8">
            <h2 className="FAQ-heading font-bold text-4xl mb-8">
                {heading}
            </h2>
            <div className="FAQ-content divide-y border-t border-b">
                {fAQs.map(faq => (
                    <FAQ key={faq.question} question={faq.question} answer={faq.answer} />
                ))}
            </div>
        </div>
    )
}

export default FAQs;