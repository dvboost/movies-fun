'use client'
import { ChevronLeftIcon } from '@chakra-ui/icons'
import { Box, Button, Text, Flex, Heading, Progress } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { movies } from '@/config/movies'
import Invest from './Invest'

interface Props {
  slug: string
}

export default function Movie({ slug }: Props) {
  const router = useRouter()

  const movie = movies.find((m) => m.slug === slug)

  if (!movie) {
    return null
  }

  return (
    <>
      <Box bg="gray.900" color="white" minH="100vh" p={6}>
        <Button
          leftIcon={<ChevronLeftIcon />}
          color="gray.300"
          variant="link"
          mb={4}
          onClick={() => router.back()}
        >
          Back to list
        </Button>

        <Box
          bg="black"
          borderRadius="lg"
          overflow="hidden"
          position="relative"
          maxW="80%"
          mx="auto"
        >
          <Box
            position="relative"
            overflow="hidden"
            width="100%"
            paddingTop="56.25%"
          >
            <iframe
              title="YouTube Video"
              width="100%"
              height="100%"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
              }}
              src={movie.video.replace('watch?v=', 'embed/')}
              frameBorder="0"
              allowFullScreen
            />
          </Box>
        </Box>

        <Box maxW="80%" mx="auto" mt={6}>
          <Flex align="center" gap={2} mb={2}>
            <Text fontSize="5xl" fontWeight="bold">
              {movie.title}
            </Text>
            {movie.genres.map((genre) => (
              <Text
                key={genre}
                color="orange.500"
                borderColor="orange.500"
                border="1px solid"
                borderRadius="8px"
                p="4px 16px 4px 16px"
                alignContent="center"
                height="33px"
                align="center"
              >
                {genre}
              </Text>
            ))}
          </Flex>
          <Box>
            <Text fontSize="3xl" color="gray.400">
              {movie.director}
            </Text>
            <Text fontSize="3xl" fontStyle="italic">
              Director
            </Text>
          </Box>

          <Flex mt={4} gap={6}>
            <Text flex="2" fontSize="2xl" lineHeight="1.6">
              {movie.description}
            </Text>
            <Text flex="1" fontSize="2xl" color="gray.400" textAlign="right">
              {movie.location}
            </Text>
          </Flex>
        </Box>
      </Box>
      <Box maxW="80%" mx="auto" p={6}>
        <Flex align="center" justify="space-between" mb={6}>
          <Heading size="lg" fontWeight="bold">
            INVEST INTO THIS MOVIE
          </Heading>
          <Button
            colorScheme="orange"
            borderRadius="full"
            px={6}
            py={5}
            fontSize="lg"
            fontWeight="bold"
          >
            Make a pledge
          </Button>
        </Flex>
        <Box>
          <Invest chainId={movie.chainId} listingId={movie.listingId} />
        </Box>
        <Flex gap={8} mt={12} flexWrap="wrap">
          <Box flex="1" minW="200px">
            <Heading as="h3" size="lg" mb={2} color="gray.700">
              Goal
            </Heading>
            <Text fontSize="3xl" fontWeight="bold" color="orange.500">
              $6 500.00
            </Text>
            <Box mt={2}>
              <Progress
                value={68}
                size="lg"
                colorScheme="blue"
                bg="gray.200"
                borderRadius="md"
              />
              <Flex justify="space-between" mt={1}>
                <Text>0</Text>
                <Text>50</Text>
                <Text>100</Text>
              </Flex>
              <Text fontSize="lg" mt={2}>
                $3 489 - 68% funded
              </Text>
            </Box>
          </Box>
          <Box flex="1" minW="200px">
            <Heading as="h3" size="lg" mb={2} color="gray.700">
              Deadline
            </Heading>
            <Text fontSize="xl" fontWeight="bold" color="orange.500">
              25 DAYS, 12 HOURS,
            </Text>
            <Text fontSize="xl" fontWeight="bold" color="orange.500" mb={2}>
              19 MINS
            </Text>
            <Text fontSize="lg">2025 October 16th</Text>
          </Box>

          <Box minW="320px">
            <Flex align="center" mb={2}>
              <Heading as="h3" size="lg" color="gray.700">
                Contributors
              </Heading>
              <Text fontSize="2xl" fontWeight="bold" color="blue.500" ml={2}>
                48
              </Text>
            </Flex>

            <Box>
              {[
                'Name Lastname',
                'Anonymous',
                'Anonymous',
                'Name Lastname',
                'Anonymous',
              ].map((name, index) => (
                <Flex
                  key={index}
                  justify="space-between"
                  py={1}
                  borderBottom="1px"
                  borderColor="gray.200"
                  fontSize="md"
                >
                  <Text>{name}</Text>
                  <Text color="orange.500" fontWeight="medium">
                    $400
                  </Text>
                </Flex>
              ))}
            </Box>
          </Box>
        </Flex>

        <Flex gap={8} flexWrap="wrap" mt={12}>
          <Box flex="1" minW="200px">
            <Heading size="lg" fontWeight="bold">
              MORE ABOUT THE MOVIE
            </Heading>
            <Heading
              as="h3"
              size="lg"
              mt={6}
              color="gray.700"
              fontWeight="regular"
              textTransform="capitalize"
            >
              Based on the real life story of the writer/director.
            </Heading>
            <Box mt={3}>
              A teenage boy wakes up on the side of the road with no clothes on.
              He walks along the beach and returns to the Divine Tropical House
              hotel at sunrise. The following evening, at the hotel’s luau
              party, the disassociating teen searches for solace and happiness
              in a superficial, shallow environment. He’s harassed by his
              father’s hyper-masculine buddies, his mother’s invasive
              girlfriends and his own drug-abusive teenage friends. He wins a
              lifetime of free cover and drinks to the very bar his was roofied
              at. After embarrassing himself on stage at the luau, he escapes
              the party, strips his clothes and enters the ocean.
            </Box>
            <Heading
              as="h3"
              size="lg"
              mt={6}
              color="gray.700"
              fontWeight="regular"
              textTransform="capitalize"
            >
              Who is the lead character Harry?
            </Heading>
            <Box mt={3}>
              Well... it's me. I started writing the early origins of this
              script when I was sixteen. I tried to process everything that I
              was going through by typing out a script, but it wasn't going
              well. I struggled to represent how I was feeling, and how to tell
              this interior struggle as a convincing and engaging film. I went
              back to the drawing board over and over again and kept coming up
              empty handed. It wasn't until my senior thesis writing class at
              Chapman University (where I met my incredible producer Ryan
              Flaherty) that I was able to translate my experience into a story
              I felt would convey everything that had been bottled up for over
              six years. This story represents the dissociative feeling that I
              had following the incident. It was important to me that the
              audience feels the lack of control that I felt I had on my own
              life - as if life was happening to me rather than me making life
              happen. The protagonist Harry gets shoved, pushed around, made
              uncomfortable, demanded to tell stories and forced to apologize,
              all as he is attempting to figure out how he feels about what
              happened to him.
            </Box>
          </Box>

          <Box minW="320px">
            <Flex align="center" mb={2}>
              <Heading as="h3" size="lg" color="gray.700">
                The Team
              </Heading>
            </Flex>
            <Box>
              {[
                ['Name Lastname', 'Director'],
                ['Name Lastname', 'Actor'],
                ['Name Lastname', 'Actor'],
                ['Name Lastname', 'Actor'],
              ].map((item, index) => (
                <Flex
                  key={index}
                  justify="space-between"
                  py={1}
                  borderBottom="1px"
                  borderColor="gray.200"
                  fontSize="md"
                >
                  <Text>{item[0]}</Text>
                  <Text color="blue.500" fontWeight="medium">
                    {item[1]}
                  </Text>
                </Flex>
              ))}
            </Box>
          </Box>
        </Flex>
      </Box>
    </>
  )
}
