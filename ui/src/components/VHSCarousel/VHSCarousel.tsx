'use client'

import { movies } from '@/config/movies'
import {
  Box,
  Image,
  Flex,
  Button,
  Text,
  Circle,
  Heading,
  SimpleGrid,
  CircularProgress,
} from '@chakra-ui/react'
import Link from 'next/link'

export default function VHSCarousel() {
  return (
    <Box pb={16}>
      <Flex justify="center" align="center">
        <Heading>LISTED MOVIES</Heading>
      </Flex>
      <SimpleGrid columns={{ base: 1, lg: 3 }} py={6}>
        {movies.map((movie) => (
          <Flex direction="column" align="center">
            <Image
              src={movie.image}
              transition="transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out"
              w="300px"
              _hover={{
                transform: 'scale(1.1)',
              }}
            />
            <Flex
              align="center"
              justify="center"
              width="full"
              overflow="hidden"
              mt={6}
            >
              <Box>
                <Flex justify="space-between" align="center" gap={6}>
                  <Box>
                    <Text fontSize="lg" fontWeight="bold">
                      {movie.director}
                    </Text>
                    <Text fontStyle="italic" color="gray.600">
                      Director
                    </Text>
                  </Box>

                  <Flex gap={2} mt={2}>
                    {movie.genres.map((genre) => (
                      <Text
                        color="orange.500"
                        borderColor="orange.500"
                        border="1px solid"
                        borderRadius="8px"
                        p="4px 16px 4px 16px"
                        align="center"
                        alignContent="center"
                        height="33px"
                      >
                        {genre}
                      </Text>
                    ))}
                  </Flex>
                </Flex>

                <Box borderBottom="2px solid" borderColor="orange.400" my={3} />

                <Flex justify="space-between" align="center">
                  <Box>
                    <Text fontSize="lg" fontWeight="bold" color="blue.500">
                      32d 18h
                    </Text>
                    <Text fontSize="md" fontWeight="normal" color="blue.400">
                      until deadline
                    </Text>
                  </Box>

                  <Flex align="center" gap={2}>
                    <Text fontSize="lg" fontWeight="bold" color="orange.500">
                      67%{' '}
                      <Text as="span" fontStyle="italic">
                        funded
                      </Text>
                    </Text>
                    <CircularProgress color="orange" value={67} />
                  </Flex>
                </Flex>
                <Flex justify="center" align="center">
                  <Button
                    as={Link}
                    href={`/movies/${movie.slug}`}
                    mt={4}
                    bg="orange.400"
                    color="white"
                    fontSize="lg"
                    fontWeight="bold"
                    borderRadius="full"
                    px={6}
                    py={3}
                    boxShadow="md"
                    _hover={{ bg: 'orange.500' }}
                    _active={{ transform: 'scale(0.95)' }}
                  >
                    Learn more
                  </Button>
                </Flex>
              </Box>
            </Flex>
          </Flex>
        ))}
      </SimpleGrid>
    </Box>
  )
}
