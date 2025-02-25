import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { metaMaskWallet } from '@rainbow-me/rainbowkit/wallets'
import { arbitrumSepolia } from '@wagmi/core/chains'
import { http } from 'wagmi'

const testnetChains = [arbitrumSepolia]

const testnetTransports = {
  [arbitrumSepolia.id]: http(),
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
