import React, { useEffect, useRef, useState } from "react";

export const InfiniteScroll = (ref: React.MutableRefObject<any>) => {
  const [isVisible, setIsVisible] = useState(false);
  const observeRef = useRef<IntersectionObserver | null>(null);

  // useEffect to set up the IntersectionObserver
  useEffect(() => {
    if (ref.current) {
      observeRef.current = new IntersectionObserver(([entry]) => {
        setIsVisible(entry.isIntersecting);
      }, {
        threshold: 0.5,
      });

      return () => {
        // Cleanup code
        observeRef.current?.disconnect();
        console.log("unObserve", observeRef.current);
      };
    }
  }, [ref]);

  // useEffect to start observing the element
  useEffect(() => {
    if (ref.current && observeRef.current) {
      observeRef.current.observe(ref.current);
    }

    return () => {
      // Cleanup when the component unmounts
      if (observeRef.current) {
        observeRef.current.disconnect();
        console.log("unObserve", observeRef.current);
      }
    };
  }, [ref]);

  console.log("entries", isVisible);

  return isVisible;
};
