// app/providers.tsx
"use client";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    capture_pageview: false, // Disable automatic pageview capture, as we capture manually
    capture_pageleave: true, // Enable automatic pageleave capture
  });
}

interface PHProviderProps {
  children: React.ReactNode;
}

export const PHProvider: React.FC<PHProviderProps> = (props) => {
  return <PostHogProvider client={posthog}>{props.children}</PostHogProvider>;
};
