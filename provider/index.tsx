"use client";

import React, { type ReactNode } from "react";

import { projectId, wagmiAdapter } from "@/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAppKit, CreateAppKit } from "@reown/appkit/react";
import { mainnet } from "@reown/appkit/networks";
import { WagmiProvider, cookieToInitialState, type Config } from "wagmi";
import VoteChainProvider from "@/context";
import { zkSyncSepoliaTestnet } from "@/config/customNetwork";

// set up react-query client
const queryClient = new QueryClient();

if (!projectId) {
  throw new Error("ProjectId is not defined");
}

// Create the modal

const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [zkSyncSepoliaTestnet],
  features: {
    socials: false,
    email: false,
  },
  themeVariables: {
    "--apkt-font-family": "'Inter', sans-serif",
    "--apkt-border-radius-master": "5px",
  },
});

function Provider({
  children,
  cookies,
}: {
  children: ReactNode;
  cookies?: string | null;
}) {
  const initialState = cookieToInitialState(
    wagmiAdapter.wagmiConfig as Config,
    cookies
  );
  return (
    <WagmiProvider
      initialState={initialState}
      config={wagmiAdapter.wagmiConfig as Config}
    >
      <QueryClientProvider client={queryClient}>
        <VoteChainProvider>{children}</VoteChainProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default Provider;
