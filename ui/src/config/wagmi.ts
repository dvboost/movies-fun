import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { metaMaskWallet } from '@rainbow-me/rainbowkit/wallets'
import { arbitrumSepolia, storyAeneid } from '@wagmi/core/chains'
import { http } from 'wagmi'

const testnetChains = [arbitrumSepolia, storyAeneid]

const testnetTransports = {
  [arbitrumSepolia.id]: http(),
  [storyAeneid.id]: http(),
}

const wallets = [metaMaskWallet]

export const config = getDefaultConfig({
  appName: 'Movies',
  projectId: 'PROJECTID',
  wallets: [{ groupName: 'Wallets', wallets }],
  transports: testnetTransports,
  chains: testnetChains as any,
  ssr: true,
})
