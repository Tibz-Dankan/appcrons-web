import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useAppDispatch } from "@/hooks/redux";
import { hidePageLoader } from "@/store/actions/pageLoader";

const OnPageLoadCompleteHandler = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch: any = useAppDispatch();

  const hidePageLoaderHandler = () => {
    const progressBar = document.getElementById("progressbar")!;
    if (!progressBar) return;

    progressBar.style.transition = "all 0.8s ease";
    progressBar.style.width = "100vw";
    progressBar.style.opacity = "0";

    setTimeout(() => {
      dispatch(hidePageLoader());
    }, 10000);
  };

  useEffect(() => hidePageLoaderHandler(), [pathname, searchParams]);
  return null;
};

export const OnPageLoadComplete = () => {
  return (
    <Suspense>
      <OnPageLoadCompleteHandler />
    </Suspense>
  );
};
