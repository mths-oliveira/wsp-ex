import { Stack, StackProps } from "@chakra-ui/react"

export function MenuItem(props: StackProps) {
  return (
    <Stack
      spacing="1rem"
      direction="row"
      alignItems="center"
      padding={["1rem", "1rem 1.5rem"]}
      width={["fit-content", "100%"]}
      cursor="pointer"
      _hover={{
        bg: "secondary",
      }}
      sx={{
        "&>p": {
          display: ["none", "inline"],
          whiteSpace: "nowrap",
        },
        "&>svg": {
          fontSize: ["1.5rem", "1.25rem"],
        },
      }}
      {...props}
    />
  )
}
