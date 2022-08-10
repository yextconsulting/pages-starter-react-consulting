import React, { useState, useEffect, useRef } from "react";
import { FAQItem } from "src/types/entities";
import { GoChevronUp, GoChevronDown } from "react-icons/go";
import "src/styles/FAQ.css";

type FAQProps = {
    heading: string;
    fAQs: FAQItem[];
}

const FAQ = (props: FAQProps) => {
    const { heading, fAQs } = props;
    const [ faqsOpen, setFaqsOpen ] = useState(new Array(fAQs.length).fill(false))
    const faqRefs = useRef<HTMLDivElement[]>([]);

    const toggleFAQ = (index: number) => {
        if (!faqsOpen[index]) {
            const ansHeight = faqRefs.current[index].scrollHeight
            faqRefs.current[index].style.height = ansHeight + 'px';
        } else {
            faqRefs.current[index].style.height = '';
        }
        let newArr = [...faqsOpen];
        newArr[index] = !newArr[index];
        setFaqsOpen(newArr);
    }

    return (
        <div className="FAQ container">
            <h2 className="FAQ-heading font-bold text-4xl mb-8">
                {heading}
            </h2>
            <div className="FAQ-content divide-y border-t border-b">
                {fAQs.map((faq, index) => (
                    <div className="FAQ-qa">
                        <div className="FAQ-question justify-between flex py-4 cursor-pointer font-bold text-lg" onClick={() => toggleFAQ(index)}>
                            <div>
                                {faq.question}
                            </div>
                            <div>
                                {faqsOpen[index] ? (<GoChevronUp color="#1B78D0" size="1.5em" />) : (<GoChevronDown color="#1B78D0" size="1.5em" />)}
                            </div>
                        </div>
                        <div ref={(el) => {faqRefs.current[index] = el!}} className="FAQ-answer js-faq-answer font-normal text-base overflow-y-hidden duration-500 h-0 transition-[height]">
                            <div className="mb-4">
                                {faq.answer}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FAQ;