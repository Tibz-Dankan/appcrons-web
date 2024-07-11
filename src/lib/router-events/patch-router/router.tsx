import { useRouter as useRouterOriginal } from "next/navigation";
import { useAppDispatch } from "@/hooks/redux";
import { showPageLoader } from "@/store/actions/pageLoader";

import { shouldTriggerStartEvent } from "./should-trigger-start-event";

export const useRouter = (): ReturnType<typeof useRouterOriginal> => {
  const router = useRouterOriginal();
  const dispatch: any = useAppDispatch();

  const showPageLoaderHandler = () => {
    dispatch(showPageLoader());
  };

  return {
    ...router,
    push: (href, options) => {
      if (shouldTriggerStartEvent(href)) showPageLoaderHandler();
      router.push(href, options);
    },
    replace: (href, options) => {
      if (shouldTriggerStartEvent(href)) showPageLoaderHandler();
      router.replace(href, options);
    },
  };
};
