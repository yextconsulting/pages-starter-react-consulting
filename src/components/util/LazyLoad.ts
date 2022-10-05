import { useState, useEffect } from "react";

const OPTIONS: IntersectionObserverInit = {
  root: null,
  rootMargin: '0px 0px 0px 0px',
  threshold: 0,
};

export default function runIfVisible(ref: React.MutableRefObject<HTMLInputElement>, options = OPTIONS) {
  const [isVisibleOnce, setIsVisibleOnce] = useState(false);

  useEffect(() => {
    if (ref.current) {
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisibleOnce(true);
            observer.unobserve(ref.current);
          }
        });
      }, options);
      observer.observe(ref.current);
    }
  }, [ref]);

  return isVisibleOnce;
}
