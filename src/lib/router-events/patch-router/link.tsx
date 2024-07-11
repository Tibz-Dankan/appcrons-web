import NextLink from "next/link";
import { forwardRef } from "react";
import { useAppDispatch } from "@/hooks/redux";
import { showPageLoader } from "@/store/actions/pageLoader";

import { shouldTriggerStartEvent } from "./should-trigger-start-event";

export const Link = forwardRef<HTMLAnchorElement, React.ComponentProps<"a">>(
  function Link({ href, onClick, ...rest }, ref) {
    const dispatch: any = useAppDispatch();

    const showPageLoaderHandler = () => {
      dispatch(showPageLoader());
    };

    const useLink = href && href.startsWith("/");
    if (!useLink) return <a href={href} onClick={onClick} {...rest} />;

    return (
      <NextLink
        href={href}
        onClick={(event) => {
          if (shouldTriggerStartEvent(href, event)) showPageLoaderHandler();
          if (onClick) onClick(event);
        }}
        {...rest}
        ref={ref}
      />
    );
  }
);
