export const BASE_SEPOLIA_CHAIN_ID = 84532;
export const FAUCET_CONTRACT_ADDRESS = '0x804972f3BF4c27Cd2D080029A84408d425E9B9DA';
export const FAUCET_ABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'receipent',
        type: 'address',
      },
    ],
    name: 'claim',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;
