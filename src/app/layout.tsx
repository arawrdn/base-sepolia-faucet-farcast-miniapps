import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from '../config';

import './global.css';
import '@coinbase/onchainkit/styles.css';
import '@rainbow-me/rainbowkit/styles.css';
import dynamic from 'next/dynamic';

const OnchainProviders = dynamic(
  () => import('src/components/OnchainProviders'),
  {
    ssr: false,
  },
);

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

// --- CORRECTED METADATA BLOCK ---
export const metadata: Metadata = {
  title: 'Base Sepolia Faucet Mini App', 
  description: 'Claim 0.05 Base Sepolia ETH inside Farcaster',
  openGraph: {
    title: 'Base Sepolia Faucet',
    description: 'Claim 0.05 Base Sepolia ETH',
    // Uses your uploaded image for Open Graph fallback
    images: [`${NEXT_PUBLIC_URL}/embed.png`], 
  },
  other: {
    // Farcaster Frame Tags (Mandatory for rendering the Frame)
    'fc:frame': 'vNext', 
    // References the image you uploaded to the /public directory
    'fc:frame:image': `${NEXT_PUBLIC_URL}/embed.png`, 
    // Initial button text
    'fc:frame:button:1': 'Launch Faucet App',
    // Post URL for the initial frame interaction (usually the app's root URL)
    'fc:frame:post_url': NEXT_PUBLIC_URL,
  },
};
// --------------------------------

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex items-center justify-center">
        <OnchainProviders>{children}</OnchainProviders>
      </body>
    </html>
  );
}
