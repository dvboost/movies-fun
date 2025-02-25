import React from 'react'
import { Tag as ChakraTag, TagProps } from '@chakra-ui/react'

interface Props extends TagProps {
  children: React.ReactNode
}

const Tag = ({ children, ...rest }: Props) => {
  return (
    <ChakraTag
      border="2px solid"
      borderColor="orange.500"
      color="orange.500"
      borderRadius="lg"
      px={3}
      py={1}
      fontSize="md"
      background="transparent"
      {...rest}
    >
      {children}
    </ChakraTag>
  )
}

export default Tag
