import { useState, useRef } from "react";
import { GoChevronDown } from "react-icons/go";
import c from "classnames";
import classNames from "classnames";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ = (props: FAQItem) => {
  const { question, answer } = props;
  const [isOpen, setIsOpen] = useState(false);
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
  };

  return (
    <div>
      <button
        className="justify-between w-full flex py-4 cursor-pointer font-bold text-lg"
        onClick={faqToggle}
      >
        <div>{question}</div>
        <div>
          <GoChevronDown
            className={c(
              "transition-transform duration-500 text-brand-primary",
              { "rotate-180": isOpen }
            )}
            size="1.5em"
          />
        </div>
      </button>
      <div
        ref={faqRef}
        className={classNames(
          "overflow-hidden duration-500 h-0 transition-all",
          { invisible: !isOpen }
        )}
      >
        <div className="mb-4">{answer}</div>
      </div>
    </div>
  );
};

export default FAQ;
