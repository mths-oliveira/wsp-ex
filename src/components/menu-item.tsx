import { Stack, StackProps } from "@chakra-ui/react"

export function MenuItem(props: StackProps) {
  return (
    <Stack
      spacing={["0.25rem", "1rem"]}
      direction={["column", "row"]}
      alignItems="center"
      padding={["0.5rem", "1rem 1.5rem"]}
      width="100%"
      cursor="pointer"
      _hover={{
        bg: "secondary",
      }}
      sx={{
        "&>p": {
          whiteSpace: "nowrap",
          fontSize: ["12px", "1rem"],
        },
        "&>svg": {
          fontSize: "1.25rem",
        },
      }}
      {...props}
    />
  )
}
