import { Text, useColorMode } from "@chakra-ui/react"
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md"
import { MenuItem } from "./menu-item"

export function ToggleThemeItem() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <MenuItem onClick={toggleColorMode}>
      {colorMode === "dark" ? (
        <>
          <MdOutlineLightMode />
          <Text>Modo Claro</Text>
        </>
      ) : (
        <>
          <MdDarkMode />
          <Text>Modo Escuro</Text>
        </>
      )}
    </MenuItem>
  )
}
