'use client';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Footer from 'src/components/Footer';
import TransactionWrapper from 'src/components/TransactionWrapper';
import { useAccount } from 'wagmi';

export default function Page() {
  const { address, isConnected } = useAccount();

  return (
    // Set background to dark
    <div className="flex w-full flex-col items-center min-h-screen p-4 bg-gray-900"> 
      
      {/* 1. Faucet Header & Connect Button */}
      <section className="mt-4 mb-6 flex w-full max-w-sm flex-row items-center justify-between">
        {/* Header text in yellow */}
        <h1 className="text-xl font-extrabold text-yellow-400">Base Sepolia Faucet</h1>
        <ConnectButton /> 
      </section>
      
      {/* 2. Main Faucet/Transaction Area - Dark box with yellow shadow */}
      <section className="templateSection flex w-full max-w-sm flex-col items-center justify-center gap-6 rounded-xl bg-gray-800 shadow-2xl shadow-yellow-500/50 p-6 border border-yellow-500 min-h-[300px]">
        
        {/* Conditional Content */}
        {isConnected && address ? (
          <>
            <p className="text-center text-sm font-medium text-gray-300">
                Wallet Connected: {address.slice(0, 6)}...{address.slice(-4)}
            </p>
            {/* TransactionWrapper (Contains the 'Claim' button) */}
            <TransactionWrapper address={address} />
          </>
        ) : (
          /* Display when not connected */
          <div className="text-center py-8">
            
            {/* Title in yellow */}
            <h2 className="text-2xl font-extrabold text-yellow-400 mb-2">Base Sepolia Faucet</h2>
            
            {/* MAIN CLAIM MESSAGE in bright yellow/lime */}
            <p className="text-3xl font-black text-lime-400 mb-6 pb-2 mx-auto max-w-xs">
                Claim Free 0.05 Base Sepolia ETH
            </p>
            
            {/* INSTRUCTIONS */}
            <p className="text-base text-gray-200 mb-2">
                You can claim every 24 hours.
            </p>
            <p className="text-sm text-yellow-500">
                Please use the **Connect Wallet** button above.
            </p>
            
          </div>
        )}
      </section>

      {/* 3. Footer (Assumes Footer component is styled appropriately for dark mode) */}
      <Footer />
    </div>
  );
}
