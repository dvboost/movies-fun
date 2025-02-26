'use client'

import { useStory } from '@/providers/StoryProvider'
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Image,
  Input,
  NumberInput,
  NumberInputField,
  Select,
  Stack,
  Textarea,
  useToast,
} from '@chakra-ui/react'
import { randomBytes } from 'crypto'
import { useState } from 'react'
import { parseEther, toHex, zeroAddress } from 'viem'
import { useAccount } from 'wagmi'
import { writeContract, waitForTransactionReceipt } from '@wagmi/core'
import { useForm } from 'react-hook-form'
import Loader from '@/components/Loader/Loader'
import { chains } from '@/config/chains'
import ChainRequired from '@/components/ChainRequired/ChainRequired'
import { config } from '@/config/wagmi'
import collectorAbi from '@/config/abi/Collector.json'
import { useRouter } from 'next/navigation'

const SPG_NFT_CONTRACT = '0xc32A8a0FF3beDDDa58393d022aF433e78739FAbc'

export default function Create() {
  const { client } = useStory()
  const router = useRouter()
  const toast = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { address: userAddress } = useAccount()
  const [image, setImage] = useState<any>(null)
  const [selectedChainId, setSelectedChainId] = useState<number>()
  const [loadingText, setLoadingText] = useState<string | undefined>(undefined)

  const handleRegister = async (data: any) => {
    try {
      const chain = chains.find((c) => c.id === selectedChainId)
      if (!userAddress || !chain) {
        throw new Error('User is not connected')
      }
      let ipId, tokenId
      if (selectedChainId === 1315) {
        setLoadingText('Minting and registering IP on Story')
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
        ipId = mintResponse.ipId
        tokenId = mintResponse.tokenId
      }
      const tx = await writeContract(config, {
        abi: collectorAbi,
        address: chain.collector as any,
        functionName: 'createListing',
        args: [
          data.title,
          (new Date(data.endDate).getTime() / 1000).toFixed(0),
          parseEther(data.raiseGoal),
          ipId ?? '0',
          tokenId ?? zeroAddress,
          SPG_NFT_CONTRACT,
        ],
      })
      await waitForTransactionReceipt(config, { hash: tx })
      toast({ status: 'success', title: 'Movie created successfully' })
      router.push('/')
    } catch (e) {
      console.error(e)
      toast({ status: 'error', title: 'Something went wrong' })
    } finally {
      setLoadingText(undefined)
    }
  }

  return (
    <Box
      bg="white"
      maxW="700px"
      mx="auto"
      my={12}
      p={5}
      boxShadow="lg"
      borderRadius="md"
    >
      <Box fontSize="lg" fontWeight="bold" mb={6}>
        New Movie
      </Box>
      <form onSubmit={handleSubmit(handleRegister)}>
        <Stack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input {...register('title', { required: true })} />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Director</FormLabel>
            <Input {...register('director', { required: true })} />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Genres</FormLabel>
            <Select {...register('genres', { required: true })}>
              <option value="Action">Action</option>
              <option value="Drama">Drama</option>
              <option value="Comedy">Comedy</option>
              <option value="Horror">Horror</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea {...register('description')} />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Location</FormLabel>
            <Input {...register('location', { required: true })} />
          </FormControl>

          <FormControl>
            <FormLabel>Image</FormLabel>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0])}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Video URL</FormLabel>
            <Input
              {...register('video')}
              placeholder="https://example.com/trailer.mp4"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Raise Goal (USD)</FormLabel>
            <NumberInput min={0}>
              <NumberInputField
                {...register('raiseGoal', { required: true })}
              />
            </NumberInput>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Raise End Date</FormLabel>
            <Input type="date" {...register('endDate', { required: true })} />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Chain</FormLabel>
            <Flex gap={3}>
              {chains.map((c) => (
                <Button
                  variant="outline"
                  borderColor={c.id === selectedChainId ? 'orange' : undefined}
                  borderWidth={c.id === selectedChainId ? '2px' : undefined}
                  leftIcon={<Image src={c.icon} w="30px" borderRadius="full" />}
                  onClick={() => setSelectedChainId(c.id)}
                >
                  {c.name}
                </Button>
              ))}
            </Flex>

            <FormHelperText>
              IP Registration is only available on Story
            </FormHelperText>
          </FormControl>

          <Box mt={3}>
            {loadingText ? (
              <Loader text={loadingText} size="xl" />
            ) : (
              <ChainRequired requiredChainId={selectedChainId} w="full">
                <Button colorScheme="orange" type="submit" w="full">
                  Submit
                </Button>
              </ChainRequired>
            )}
          </Box>
        </Stack>
      </form>
    </Box>
  )
}
