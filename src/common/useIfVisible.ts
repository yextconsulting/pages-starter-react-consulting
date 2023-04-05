import { useState, useEffect } from "react";

const OPTIONS: IntersectionObserverInit = {
  root: null,
  rootMargin: "100px 0px",
  threshold: 0,
};

export function useIfVisible(
  ref: React.RefObject<HTMLElement>,
  options = OPTIONS
) {
  const [isVisibleOnce, setIsVisibleOnce] = useState(false);

  useEffect(() => {
    if (ref.current) {
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisibleOnce(true);
            if (!ref.current) return;
            observer.unobserve(ref.current);
          }
        });
      }, options);
      observer.observe(ref.current);
      return () => {
        observer.disconnect();
      };
    }
  }, [ref, options]);

  return isVisibleOnce;
}
