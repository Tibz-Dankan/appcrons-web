import { ReactNode } from "react";

export type TPageLink = {
  linkValue: string;
  linkName: string;
  linkContentHeader?: ReactNode;
  linkComponent: ReactNode;
};
