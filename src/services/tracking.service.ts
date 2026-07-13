import { backendURL } from "@/constants";

export type TCapturePageVisit = {
  page: string;
  path: string;
  capturedAt: string;
};

export class TrackingService {
  captureSiteVisit = async ({ page, path, capturedAt }: TCapturePageVisit) => {
    let accessToken: string | undefined;
    try {
      const raw = localStorage.getItem("session");
      if (raw) accessToken = JSON.parse(raw)?.accessToken;
    } catch {
      // ignore - anonymous visit is fine
    }

    const response = await fetch(`${backendURL}/sitevisit/post`, {
      method: "POST",
      body: JSON.stringify({ page, path, capturedAt }),
      headers: {
        "Content-type": "application/json",
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
    });

    if (!response.ok) {
      throw new Error("Failed to capture site visit");
    }
    return await response.json();
  };
}
