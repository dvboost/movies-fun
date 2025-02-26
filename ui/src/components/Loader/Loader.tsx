import React from 'react'
import { Box, Spinner, Flex, BoxProps } from '@chakra-ui/react'

interface Props extends BoxProps {
  size?: string
  text?: string
}

const Loader = ({ size, text, ...rest }: Props) => {
  return (
    <Flex align="center" py={6} gap={5} {...rest}>
      <Spinner size={size ?? 'lg'} />
      <Box fontSize={size ?? 'lg'}>{text ?? 'Loading'}</Box>
    </Flex>
  )
}

export default Loader
