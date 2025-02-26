'use client'
import { theme } from './theme'
import { ChakraProvider } from '@chakra-ui/react'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { config } from '@/config/wagmi'
import '@rainbow-me/rainbowkit/styles.css'
import StoryProvider from '@/providers/StoryProvider'

interface Props {
  children: React.ReactNode
}

const queryClient = new QueryClient()

export function Providers({ children }: Props) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <StoryProvider>
            <ChakraProvider
              theme={theme}
              toastOptions={{ defaultOptions: { isClosable: true } }}
            >
              {children}
            </ChakraProvider>
          </StoryProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
