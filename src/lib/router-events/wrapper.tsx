import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useAppDispatch } from "@/hooks/redux";
import { hidePageLoader } from "@/store/actions/pageLoader";

const OnPageLoadCompleteHandler = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch: any = useAppDispatch();

  const hidePageLoaderHandler = () => {
    dispatch(hidePageLoader());
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
