import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useAccount } from 'wagmi'
import {
  readContract,
  writeContract,
  waitForTransactionReceipt,
} from '@wagmi/core'
import collectorAbi from '@/config/abi/Collector.json'
import tokenAbi from '@/config/abi/Token.json'
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  SimpleGrid,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react'
import { chains } from '@/config/chains'
import { config } from '@/config/wagmi'
import { formatEther, parseEther } from 'viem'

interface Props {
  chainId: number
  listingId: string
}

const Invest = ({ chainId, listingId }: Props) => {
  const toast = useToast()
  const { address } = useAccount()
  const { register, handleSubmit } = useForm()
  const [amount, setAmount] = useState<string>()
  const [userStake, setUserStake] = useState<bigint>(BigInt(0))
  const [balance, setBalance] = useState<bigint>(BigInt(0))
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)

  const collectorContractConfig = {
    address: chains.find((c) => c.id === chainId)!.collector as any,
    abi: collectorAbi,
  }

  const tokenContractConfig = {
    address: chains.find((c) => c.id === chainId)!.token as any,
    abi: tokenAbi,
  }

  const fetchData = async () => {
    if (address) {
      const stake = await readContract(config, {
        ...collectorContractConfig,
        functionName: 'getUserStake',
        args: [listingId, address],
      })
      setUserStake(stake as bigint)

      const userBalance = await readContract(config, {
        ...tokenContractConfig,
        functionName: 'balanceOf',
        args: [address],
      })
      setBalance(userBalance as bigint)
    }
  }

  useEffect(() => {
    fetchData()
  }, [address, listingId])

  const onSubmit = async () => {
    if (!amount) {
      return
    }
    try {
      setIsSubmitLoading(true)
      const stakeTx = await writeContract(config, {
        ...tokenContractConfig,
        functionName: 'approve',
        args: [collectorContractConfig.address, parseEther(amount)],
      })
      await waitForTransactionReceipt(config, { hash: stakeTx })
      const tx = await writeContract(config, {
        ...collectorContractConfig,
        functionName: 'stakeTokens',
        args: [listingId, parseEther(amount)],
      })
      await waitForTransactionReceipt(config, { hash: tx })
      toast({ status: 'success', title: 'Invested successfully' })
      fetchData()
    } catch (e) {
      console.error(e)
      toast({ status: 'error', title: 'Something went wrong' })
    } finally {
      setIsSubmitLoading(false)
    }
  }

  return (
    <Box maxW="500px">
      <Flex fontSize="md" justify="space-between">
        <Text>
          Invested: ${parseFloat(formatEther(userStake)).toFixed(2) || 0}
        </Text>
        <Text>
          Balance: ${parseFloat(formatEther(balance)).toFixed(2) || 0}
        </Text>
      </Flex>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <FormControl>
              <NumberInput min={0}>
                <NumberInputField
                  {...register('amount', { required: true })}
                  placeholder="0.00"
                  fontSize="3xl"
                  py={6}
                  bg="white"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </NumberInput>
            </FormControl>
            <Button
              colorScheme="blue"
              type="submit"
              isLoading={isSubmitLoading}
            >
              Invest
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  )
}

export default Invest
