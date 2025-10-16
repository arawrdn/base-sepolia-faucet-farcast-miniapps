'use client';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Footer from 'src/components/Footer';
import TransactionWrapper from 'src/components/TransactionWrapper';
import WalletWrapper from 'src/components/WalletWrapper';
import { useAccount } from 'wagmi';

export default function Page() {
  const { address, isConnected } = useAccount();

  return (
    <div className="flex w-full flex-col items-center min-h-screen p-4 bg-gray-50"> 
      
      {/* 1. Faucet Header & Connect Button */}
      <section className="mt-4 mb-6 flex w-full max-w-sm flex-row items-center justify-between">
        <h1 className="text-xl font-extrabold text-blue-600">Base Sepolia Faucet</h1>
        <ConnectButton /> 
      </section>
      
      {/* 2. Main Faucet/Transaction Area */}
      <section className="templateSection flex w-full max-w-sm flex-col items-center justify-center gap-6 rounded-xl bg-white shadow-lg p-6 border border-gray-200 min-h-[300px]">
        
        {/* Conditional Content */}
        {isConnected && address ? (
          <>
            <p className="text-center text-sm font-medium text-gray-700">
                Wallet Connected: {address.slice(0, 6)}...{address.slice(-4)}
            </p>
            {/* TransactionWrapper (Onchainkit claim button) */}
            <TransactionWrapper address={address} />
          </>
        ) : (
          /* Display when not connected */
          <div className="text-center py-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Base Sepolia Faucet</h2>
            
            {/* The requested claim text */}
            <p className="text-2xl font-bold text-green-500 mb-6 border-b-2 border-green-500 pb-2 mx-auto max-w-xs">
                Claim Free 0.05 Base Sepolia ETH
            </p>
            <p className="text-sm text-gray-600 mb-6">
                You can claim every 24 hours. Please connect your wallet above.
            </p>
            
            {/* WalletWrapper for Miniapp compatibility */}
            <WalletWrapper
              className="w-full max-w-full"
              text="Connect Wallet and Claim"
            />
          </div>
        )}
      </section>

      {/* 3. Footer */}
      <Footer />
    </div>
  );
}
