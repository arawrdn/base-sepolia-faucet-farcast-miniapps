'use client';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  coinbaseWallet,
  metaMaskWallet,
  rainbowWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { useMemo } from 'react';
import { http, createConfig } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { NEXT_PUBLIC_WC_PROJECT_ID } from './config';

// LANGKAH 1: Import konektor khusus Farcaster
import { farcasterFrame } from '@farcaster/frame-wagmi-connector'; 

export function useWagmiConfig() {
  const projectId = NEXT_PUBLIC_WC_PROJECT_ID ?? '';
  if (!projectId) {
    const providerErrMessage =
      'To connect to all Wallets you need to provide a NEXT_PUBLIC_WC_PROJECT_ID env variable';
    throw new Error(providerErrMessage);
  }

  return useMemo(() => {
    // Definisi konektor Farcaster
    const farcasterConnector = farcasterFrame();
    
    // LANGKAH 2: Tambahkan konektor Farcaster ke daftar dompet
    const connectors = connectorsForWallets(
      [
        {
          groupName: 'Recommended Wallet',
          wallets: [
            // Tambahkan Farcaster Connector sebagai opsi utama di sini
            ({ chains }) => ({
                id: farcasterConnector.id,
                name: farcasterConnector.name,
                iconUrl: farcasterConnector.icon.light,
                iconBackground: farcasterConnector.iconBackground,
                createConnector: farcasterConnector.createConnector,
            }),
            coinbaseWallet, // Dompet yang sudah ada
          ],
        },
        {
          groupName: 'Other Wallets',
          wallets: [rainbowWallet, metaMaskWallet],
        },
      ],
      {
        appName: 'onchainkit',
        projectId,
      },
    );

    const wagmiConfig = createConfig({
      chains: [base, baseSepolia],
      // turn off injected provider discovery
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
