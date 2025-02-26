'use client'
import React from 'react'
import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  Stack,
  Image,
  Link,
  Container,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { ConnectButton } from '@rainbow-me/rainbowkit'

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const items = [
    { title: 'Discover Films', url: '/' },
    { title: 'Add Film', url: '/create' },
  ]

  return (
    <Container maxW="1500px">
      <Box p={4}>
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <HStack spacing={8} alignItems="center">
            <Image src="/images/logo.svg" alt="Logo" />
          </HStack>

          <HStack
            as={'nav'}
            spacing={12}
            display={{ base: 'none', md: 'flex' }}
          >
            {items.map((i) => (
              <Link fontSize="lg" href={i.url}>
                {i.title}
              </Link>
            ))}
            <ConnectButton />
          </HStack>

          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {items.map((i) => (
                <Link href={i.url} key={i.title}>
                  {i.title}
                </Link>
              ))}
              <ConnectButton />
            </Stack>
          </Box>
        ) : null}
      </Box>
    </Container>
  )
}

export default Navbar
