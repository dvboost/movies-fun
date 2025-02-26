'use client'
import React from 'react'
import { useAccount, useChainId, useSwitchChain } from 'wagmi'
import { Button, ButtonProps } from '@chakra-ui/react'
import { chains } from '@/config/chains'

interface Props extends ButtonProps {
  requiredChainId?: number
  children: any
}

const ChainRequired = ({ requiredChainId, children, ...rest }: Props) => {
  const chainId = useChainId()
  const { chainId: userChainId } = useAccount()
  const { switchChain } = useSwitchChain()

  if (!requiredChainId) {
    return null
  }

  if (chainId !== requiredChainId || userChainId !== requiredChainId) {
    return (
      <Button
        onClick={() => switchChain({ chainId: requiredChainId })}
        {...rest}
      >
        {`Switch to ${chains.find((c) => c.id === requiredChainId)?.name}`}
      </Button>
    )
  } else {
    return children
  }
}

export default ChainRequired
