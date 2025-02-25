'use client';

import { useState } from 'react';
import { Box, Image, Flex, Button, Text, Circle, Badge, Heading } from '@chakra-ui/react';

const images = {
    vhs1: ['images/vhs1.svg', 'images/vhs2.svg'],
    vhs2: 'images/vhs2.svg',
    vhs3: 'images/vhs3.svg',
};

export default function VHSCarousel() {

    return (
        <Box>
            <Flex justify="center" align="center">
                <Heading>OPEN TO INVEST MOVIES</Heading>
            </Flex>
            <Flex position="relative" align="center" justify="space-between" width="full" overflow="hidden" p="32px">
                {["vhs1.svg", "vhs1.svg", "vhs1.svg", "/movie.png", "vhs2.svg", "vhs2.svg", "vhs2.svg"].map((src, index) => (
                    <Image
                        key={index}
                        src={`/images/${src}`}
                        alt={src.includes("movie") ? "Movie" : `VHS ${index}`}
                        width={src.includes("movie") ? 200 : 100}
                        transition="transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out"
                        _hover={{
                            transform: "scale(1.1)",
                        }}
                    />
                ))}
            </Flex>
            <Flex align="center" justify="center" width="full" overflow="hidden" p="32px">
                <Box
                    p={5}
                    width="30%"
                >
                    <Flex justify="space-between" align="center">
                        <Box>
                            <Text fontSize="lg" fontWeight="bold">
                                Greta Gerwig
                            </Text>
                            <Text fontStyle="italic" color="gray.600">
                                Director
                            </Text>
                        </Box>

                        <Flex gap={2} mt={2}>
                            <Text color="orange.500" borderColor="orange.500" border="1px solid" borderRadius="8px" p="4px 16px 4px 16px" align="center" alignContent="center" height="33px">
                                Thriller
                            </Text>
                            <Text color="orange.500" borderColor="orange.500" border="1px solid" borderRadius="8px" p="4px 16px 4px 16px" align="center" alignContent="center" height="33px">
                                Drama
                            </Text>
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
                                67% <Text as="span" fontStyle="italic">funded</Text>
                            </Text>
                            <Circle size="40px" border="3px solid orange" borderRightColor="white" />
                        </Flex>
                    </Flex>
                <Flex justify="center" align="center">

                    <Button
                        mt={4}
                        bg="orange.400"
                        color="white"
                        fontSize="lg"
                        fontWeight="bold"
                        borderRadius="full"
                        px={6}
                        py={3}
                        boxShadow="md"
                        _hover={{ bg: "orange.500" }}
                        _active={{ transform: "scale(0.95)" }}
                        >
                        Learn more
                    </Button>
                        </Flex>
                </Box>
            </Flex>
        </Box>
    );
}
