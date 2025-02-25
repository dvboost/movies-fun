"use client"
import Tag from '@/components/Tag/Tag'
import VHSCarousel from '@/components/VHSCarousel/VHSCarousel'
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { Badge, Box, Button, Text, Flex, IconButton, Image, SimpleGrid, Heading, Progress } from '@chakra-ui/react'
import Video from 'next-video';
import { useRouter } from "next/navigation";
import ladyBird from '/videos/LadyBird.mp4';


export default function Details() {
    const router = useRouter();
    const movie = {
        title: "LADY BIRD",
        director: "Greta Gerwig",
        genres: ["Thriller", "Drama"],
        description:
            "A fiercely independent teenager tries to make her own way in the world while wanting to get out of her hometown of Sacramento, California and to get away from her complicated mother and recently-unemployed father.",
        location: "Los Angeles, California | Film short",
        image: "/images/lady-bird.jpg", // Replace with actual path
    };


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
                    <Video src={ladyBird} />
                </Box>

                <Box maxW="80%" mx="auto" mt={6}>
                    <Flex align="center" gap={2} mb={2}>
                        <Text fontSize="5xl" fontWeight="bold">LADY BIRD</Text>
                        <Text color="orange.500" borderColor="orange.500" border="1px solid" borderRadius="8px" p="4px 16px 4px 16px" alignContent="center" height="33px" align="center">Thriller</Text>
                        <Text color="orange.500" borderColor="orange.500" border="1px solid" borderRadius="8px" p="4px 16px 4px 16px" alignContent="center" height="33px" align="center">Drama</Text>
                    </Flex>
                    <Box>
                        <Text fontSize="3xl" color="gray.400">
                            Greta Gerwig
                        </Text>
                        <Text fontSize="3xl"fontStyle="italic">Director</Text>
                    </Box>

                    <Flex mt={4} gap={6}>
                        <Text flex="2" fontSize="2xl" lineHeight="1.6">
                            A fiercely independent teenager tries to make her own way in the world while
                            wanting to get out of her hometown of Sacramento, California and to get away
                            from her complicated mother and recently-unemployed father.
                        </Text>
                        <Text flex="1" fontSize="2xl" color="gray.400" textAlign="right">
                            Los Angeles, California | Film short
                        </Text>
                    </Flex>
                </Box>
            </Box>
            <Box maxW="80%" mx="auto" p={6}>
                <Flex align="center" justify="space-between" mb={6}>
                    <Heading size="lg" fontWeight="bold">INVEST INTO THIS MOVIE</Heading>
                    <Button colorScheme="orange" borderRadius="full" px={6} py={5} fontSize="lg" fontWeight="bold">
                        Make a pledge
                    </Button>
                </Flex>
                <Flex gap={8} flexWrap="wrap">
                    <Box flex="1" minW="200px">
                        <Heading as='h3' size='lg' mb={2} color="gray.700">Goal</Heading>
                        <Text fontSize="3xl" fontWeight="bold" color="orange.500">$6 500.00</Text>
                        <Box mt={2}>
                            <Progress value={68} size="lg" colorScheme="blue" bg="gray.200" borderRadius="md" />
                            <Flex justify="space-between" mt={1}>
                                <Text>0</Text>
                                <Text>50</Text>
                                <Text>100</Text>
                            </Flex>
                            <Text fontSize="lg" mt={2}>$3 489 - 68% funded</Text>
                        </Box>
                    </Box>
                    <Box flex="1" minW="200px">
                        <Heading as='h3' size='lg' mb={2} color="gray.700">Deadline</Heading>
                        <Text fontSize="xl" fontWeight="bold" color="orange.500">
                            25 DAYS, 12 HOURS,
                        </Text>
                        <Text fontSize="xl" fontWeight="bold" color="orange.500" mb={2}>
                            19 MINS
                        </Text>
                        <Text fontSize="lg">2025 October 16th</Text>
                    </Box>

                    <Box flex="1" minW="200px">
                        <Flex align="center" mb={2}>
                            <Heading as='h3' size='lg' color="gray.700">Contributors</Heading>
                            <Text fontSize="2xl" fontWeight="bold" color="blue.500" ml={2}>48</Text>
                        </Flex>

                        <Box>
                            {['Name Lastname', 'Anonymous', 'Anonymous', 'Name Lastname', 'Anonymous'].map((name, index) => (
                                <Flex key={index} justify="space-between" py={1} borderBottom="1px" borderColor="gray.200">
                                    <Text>{name}</Text>
                                    <Text color="orange.500" fontWeight="medium">$400</Text>
                                </Flex>
                            ))}
                        </Box>
                    </Box>
                </Flex>
            </Box>

        </>
    )
}
