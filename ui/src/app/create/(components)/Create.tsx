'use client'

import { useStory } from '@/providers/StoryProvider'
import { Box, Button } from '@chakra-ui/react'
import { randomBytes } from 'crypto'
import { useState } from 'react'
import { toHex } from 'viem'
import { useAccount } from 'wagmi'

const SPG_NFT_CONTRACT = '0xc32A8a0FF3beDDDa58393d022aF433e78739FAbc'

export default function Create() {
  const { client } = useStory()
  const { address: userAddress } = useAccount()
  const [ipInfo, setIpInfo] = useState<{ ipId: string; tokenId: bigint }>()

  const handleSubmit = async () => {
    if (!userAddress) {
      throw new Error('User is not connected')
    }
    const metadata = {
      ipMetadataURI: randomBytes(8).toString('hex'),
      ipMetadataHash: toHex(randomBytes(16).toString('hex'), { size: 32 }),
      nftMetadataHash: toHex(randomBytes(16).toString('hex'), { size: 32 }),
      nftMetadataURI: randomBytes(8).toString('hex'),
    }
    const mintResponse = await client?.ipAsset.mintAndRegisterIp({
      spgNftContract: SPG_NFT_CONTRACT,
      ipMetadata: metadata,
      txOptions: { waitForTransaction: true },
      allowDuplicates: false,
    })
    if (!mintResponse?.ipId || !mintResponse?.tokenId) {
      throw new Error('Register failed')
    }
    setIpInfo({ ipId: mintResponse.ipId, tokenId: mintResponse.tokenId })
  }

  return (
    <Box>
      <Button onClick={handleSubmit}>Create</Button>
    </Box>
  )
}
