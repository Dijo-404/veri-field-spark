import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { hardhat, mainnet, polygon, optimism, arbitrum, base } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'VeriField',
  projectId: 'YOUR_PROJECT_ID', // Get this from WalletConnect Cloud
  chains: [
    hardhat,
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
  ],
  ssr: true, // If your dApp uses server side rendering (SSR)
});