import Tag from '@/components/Tag/Tag'
import VHSCarousel from '@/components/VHSCarousel/VHSCarousel'
import { Box, Container, Flex, Image, SimpleGrid } from '@chakra-ui/react'

export default function HomePage() {
  return (
    <Container maxW="1500px" fontWeight="unset">
      <SimpleGrid columns={{ base: 1, lg: 2 }} my={16}>
        <Box>
          <Box fontSize="7xl" lineHeight={1} textTransform="uppercase">
            Where Visionaries Fund the Future of Film
          </Box>
          <Box fontSize="md" mt={3}>
            Hollywood has always been built by visionaries — now, it’s your turn
            to shape the future of film. IMAGINE.FUN brings the golden age of
            cinema into the Web3 era, giving you a front-row seat to exclusive
            movie investments
          </Box>
          <Flex gap={3} mt={6}>
            <Tag>3 Movies Funded</Tag>
            <Tag>$4 846 648 collected</Tag>
          </Flex>
        </Box>
        <Flex justify="end">
          <Image src="/images/cover.svg" h="350px" />
        </Flex>
      </SimpleGrid>
        <Box w="full">
          <VHSCarousel></VHSCarousel>
        </Box>
    </Container>
  )
}
