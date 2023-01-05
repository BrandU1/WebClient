import { useEffect } from "react";

interface useObserverProps {
  target: any;
  onIntersect: any;
  root?: any;
  rootMargin?: string;
  threshold?: number;
}

export const useObserver = ({
  target,
  onIntersect,
  root = null,
  rootMargin = "0px",
  threshold = 1.0,
}: useObserverProps) => {
  useEffect(() => {
    let observer: any;

    if (target && target.current) {
      observer = new IntersectionObserver(onIntersect, {
        root,
        rootMargin,
        threshold,
      });

      observer.observe(target.current);
    }

    return () => observer && observer.disconnect();
  }, [target, rootMargin, threshold]);
};
