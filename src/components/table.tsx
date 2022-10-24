import { Table as ChakraTable, TableProps } from "@chakra-ui/react"

export function Table({ sx, children, ...props }: TableProps) {
  return (
    <ChakraTable
      variant="simple"
      sx={{
        "*>tr>th": {
          color: "altText",
        },
        "&>caption": {
          color: "text",
        },
        "&>caption, *>tr>*": {
          padding: ["1rem", "1rem 1.5rem"],
        },
        "&>*>tr>*": {
          borderColor: "tertiary",
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </ChakraTable>
  )
}
