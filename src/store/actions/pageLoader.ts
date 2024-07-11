import { pageLoaderActions } from "..";

export const showPageLoader = () => {
  return (dispatch: any) => {
    dispatch(pageLoaderActions.show());
  };
};

export const hidePageLoader = () => {
  return (dispatch: any) => {
    dispatch(pageLoaderActions.hide());
  };
};
