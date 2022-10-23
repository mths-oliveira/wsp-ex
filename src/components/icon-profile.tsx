import { Box, Flex, FlexProps, Text } from "@chakra-ui/react"
import { MdChangeCircle } from "react-icons/md"
import { FlagImage } from "./flag-image"

interface Props extends FlexProps {
  country: string
  title: string
  text: string
  onOpen: () => void
}

export function IconProfile({ country, text, title, onOpen, ...rest }: Props) {
  return (
    <Flex
      flexDir={["row", "column"]}
      alignItems="center"
      textAlign={["start", "center"]}
      cursor="pointer"
      onClick={onOpen}
      {...rest}
    >
      <Box position="relative">
        <FlagImage country={country} width={["4rem", "5rem"]} />
        <Box
          position="absolute"
          bottom={["0.25rem", "0.5rem"]}
          right="0.5rem"
          bg="primary"
          padding="2px"
          borderRadius="full"
        >
          <MdChangeCircle />
        </Box>
      </Box>
      <Box fontWeight="600">
        <Text>{title}</Text>
        <Text fontSize="sm" color="altText">
          {text}
        </Text>
      </Box>
    </Flex>
  )
}
