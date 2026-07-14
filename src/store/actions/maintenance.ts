import { maintenanceActions } from "..";

export const activateMaintenance = (message: string) => {
  return (dispatch: any) => {
    dispatch(maintenanceActions.activate({ message }));
  };
};

export const deactivateMaintenance = () => {
  return (dispatch: any) => {
    dispatch(maintenanceActions.deactivate());
  };
};
