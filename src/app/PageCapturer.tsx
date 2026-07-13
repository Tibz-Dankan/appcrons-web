"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { TrackingService } from "@/services/tracking.service";

export default function PageCapturer(): null {
  const pathname = usePathname();
  const { mutate } = useMutation({
    mutationFn: new TrackingService().captureSiteVisit,
  });

  useEffect(() => {
    if (!pathname) return;
    mutate({
      page: document.title || pathname,
      path: pathname,
      capturedAt: new Date().toISOString(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
}
