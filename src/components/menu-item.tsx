import { Stack, StackProps } from "@chakra-ui/react"

export function MenuItem(props: StackProps) {
  return (
    <Stack
      spacing="1rem"
      direction="row"
      alignItems="center"
      padding="1rem 1.5rem"
      cursor="pointer"
      _hover={{
        bg: "secondary",
      }}
      {...props}
    />
  )
}
