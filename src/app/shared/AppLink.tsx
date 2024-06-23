import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, MouseEvent } from "react";

export const AppLink: React.FC<
  LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>
> = ({ children, ...props }) => {
  const router = useRouter();

  const handleClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      if (props.onClick) props.onClick(e);
      if (!e.defaultPrevented) {
        // Add logic to start the progress bar
        const progressElement = document.querySelector(
          "#page-loader"
        ) as HTMLElement;
        if (progressElement) {
          progressElement.style.width = "0%";
          setTimeout(() => {
            progressElement.style.width = "100%";
          }, 0);
        }

        // Handle navigation
        const { href } = props;
        if (typeof href === "string") {
          setTimeout(() => {
            router.push(href);
          }, 100); // Small delay to ensure the progress bar animation starts
        }
      }
    },
    [router, props.onClick, props.href]
  );

  return (
    <Link {...props} onClick={handleClick}>
      {children}
    </Link>
  );
};
