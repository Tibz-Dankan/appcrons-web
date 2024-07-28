import { useEffect, useState } from "react";

export const PageLoader: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      let increment = 0;
      if (currentProgress >= 0 && currentProgress < 20) {
        increment = 10;
      } else if (currentProgress >= 20 && currentProgress < 50) {
        increment = 4;
      } else if (currentProgress >= 50 && currentProgress < 80) {
        increment = 2;
      } else if (currentProgress >= 80 && currentProgress < 99) {
        increment = 0.5;
      } else {
        increment = 0;
      }

      currentProgress += increment;
      if (currentProgress >= 100) {
        clearInterval(interval);
        currentProgress = 100;
      }
      setProgress(currentProgress);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="progressbar"
      className="fixed top-0 left-0 w-full h-[3px] bg-primary-light z-[500]"
      style={{ width: `${progress}%`, transition: "all 0.4s ease" }}
    />
  );
};
