import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useQuery } from "@tanstack/react-query";
import { AppService } from "@/services/app.service";
import {
  updateAppLiveRequest,
  updateAppLiveLoadingStatus,
} from "@/store/actions/appLiveRequests";
import { TAppLiveRequest } from "@/types/app";

export const useGetAppsLastRequest = () => {
  const apps = useAppSelector((state) => state.app.apps);
  const dispatch: any = useAppDispatch();

  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const userId = useAppSelector((state) => state.auth.user.id);

  const hasApps: boolean = apps.length > 0;

  const { isPending, isError, data, error } = useQuery({
    queryKey: [`apps-last-requests-${userId}`],
    queryFn: () => {
      if (!userId || !hasApps) return;

      return new AppService().getAppsLastRequestByUser({
        userId: userId,
        accessToken: accessToken,
      });
    },
  });

  useEffect(() => {
    const updateAppsLoadingStatusHandler = () => {
      if (isPending) {
        dispatch(updateAppLiveLoadingStatus({ isLoading: isPending }));
        return;
      }
      // Delay updating lastRequestLoader by
      // 2 seconds when isPending is false
      const timeoutId = setTimeout(() => {
        dispatch(updateAppLiveLoadingStatus({ isLoading: isPending }));
      }, 2000);
      return () => clearTimeout(timeoutId);
    };
    updateAppsLoadingStatusHandler();
  }, [isPending, dispatch]);

  useEffect(() => {
    const updateAppsHandler = () => {
      if (!data) return;
      const appList: TAppLiveRequest[] = data?.data.apps;

      appList.map((app) => {
        dispatch(updateAppLiveRequest({ appId: app.id, app: app }));
      });
    };
    updateAppsHandler();
  }, [data, dispatch]);

  if (isError) {
    console.log("Error fetching apps last request: ", error);
    return;
  }

  return {};
};
