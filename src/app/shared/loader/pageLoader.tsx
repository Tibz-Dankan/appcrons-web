import { useEffect, useState } from "react";

export const PageLoader: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      if (currentProgress < 10) {
        currentProgress += 10;
        setProgress(currentProgress);
      } else if (currentProgress < 100) {
        currentProgress += 5;
        setProgress(currentProgress);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      setProgress(100);
      setTimeout(() => {
        setProgress(0);
      }, 1000);
    };

    window.addEventListener("load", handleRouteChange);

    return () => {
      window.removeEventListener("load", handleRouteChange);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-[3px] bg-primary-light`}
      style={{ width: `${progress}%`, transition: "width 1s ease-in" }}
    />
  );
};
