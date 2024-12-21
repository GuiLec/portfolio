"use client";

import { LDProvider } from "launchdarkly-react-client-sdk";
import React, { ReactNode } from "react";

interface LaunchDarklyProviderProps {
  children: ReactNode;
}

const LaunchDarklyProvider: React.FC<LaunchDarklyProviderProps> = ({
  children,
}) => {
  const clientSideID = process.env.NEXT_PUBLIC_LAUNCHDARKLY_CLIENT_ID;

  if (!clientSideID) {
    console.error(
      "LaunchDarkly Client ID is missing. Ensure NEXT_PUBLIC_LAUNCHDARKLY_CLIENT_ID is set."
    );
    return <>{children}</>;
  }

  return (
    <LDProvider
      clientSideID={clientSideID}
      context={{ kind: "user", key: "anonymous" }}
    >
      {children}
    </LDProvider>
  );
};

export default LaunchDarklyProvider;
