'use client';
import { useMemo } from 'react';
import { http, createConfig } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { NEXT_PUBLIC_WC_PROJECT_ID } from './config';

import { farcasterFrame } from '@farcaster/frame-wagmi-connector'; 

export function useWagmiConfig() {
  const projectId = NEXT_PUBLIC_WC_PROJECT_ID ?? '';
  if (!projectId) {
    const providerErrMessage =
      'To connect to all Wallets you need to provide a NEXT_PUBLIC_WC_PROJECT_ID env variable';
    throw new Error(providerErrMessage);
  }

  return useMemo(() => {
    const farcasterConnector = farcasterFrame();
    
    const connectors = [farcasterConnector];

    const wagmiConfig = createConfig({
      chains: [base, baseSepolia],
      autoConnect: true, 
      multiInjectedProviderDiscovery: false, 
      connectors, 
      ssr: true,
      transports: {
        [base.id]: http(),
        [baseSepolia.id]: http(),
      },
    });

    return wagmiConfig;
  }, [projectId]);
}
