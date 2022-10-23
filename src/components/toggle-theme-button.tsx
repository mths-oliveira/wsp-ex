import { Text, useColorMode } from "@chakra-ui/react"
import { MdDarkMode, MdLightMode } from "react-icons/md"
import { MenuItem } from "./menu-item"

export function ToggleThemeButton() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <MenuItem onClick={toggleColorMode}>
      {colorMode === "dark" ? (
        <>
          <MdLightMode />
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
