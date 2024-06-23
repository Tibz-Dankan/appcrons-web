import { useRouter as useNextRouter } from "next/navigation";
import { useCallback } from "react";

export const useAppRouter = () => {
  const router = useNextRouter();

  const push = useCallback(
    (url: string) => {
      const progressElement = document.querySelector(
        "#page-loader"
      ) as HTMLElement;
      if (progressElement) {
        progressElement.style.width = "0%";
        setTimeout(() => {
          progressElement.style.width = "100%";
        }, 0);
      }

      setTimeout(() => {
        router.push(url);
      }, 100); // Small delay to ensure the progress bar animation starts
    },
    [router]
  );

  const back = useCallback(() => {
    const progressElement = document.querySelector(
      "#page-loader"
    ) as HTMLElement;
    if (progressElement) {
      progressElement.style.width = "0%";
      setTimeout(() => {
        progressElement.style.width = "100%";
      }, 0);
    }

    setTimeout(() => {
      router.back();
    }, 100); // Small delay to ensure the progress bar animation starts
  }, [router]);

  return { ...router, push, back };
};
