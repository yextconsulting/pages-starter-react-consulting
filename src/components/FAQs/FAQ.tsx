import React, { useState, useRef } from "react";
import { FAQItem } from "src/types/entities";
import { GoChevronDown } from "react-icons/go";

const FAQ = (props: FAQItem) => {
    const { question, answer } = props;
    const [ isOpen, setIsOpen ] = useState(false);
    const faqRef = useRef<HTMLDivElement>(null);

    const faqToggle = () => {
        if (faqRef.current != null) {
            if (!isOpen) {
                const ansHeight = faqRef.current.scrollHeight;
                faqRef.current.style.height = `${ansHeight}px`;
            } else {
                faqRef.current.style.height = `0`;
            }
        }
        setIsOpen(!isOpen);
    }

    return (
        <div className="FAQ-qa">
            <div className="FAQ-question justify-between flex py-4 cursor-pointer font-bold text-lg" onClick={() => faqToggle()}>
                <div>
                    {question}
                </div>
                <div>
                    <GoChevronDown className={`transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`} color="#1B78D0" size="1.5em" />
                </div>
            </div>
            <div ref={faqRef} className="FAQ-answer font-normal text-base overflow-y-hidden duration-500 h-0 transition-[height]">
                <div className="mb-4">
                    {answer}
                </div>
            </div>
        </div>
    )
}

export default FAQ;