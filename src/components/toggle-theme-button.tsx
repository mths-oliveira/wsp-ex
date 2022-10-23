import { useColorMode } from "@chakra-ui/react"
import { MdDarkMode, MdLightMode } from "react-icons/md"
import { IconButton } from "./icon-button"

export function ToggleThemeButton() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <IconButton
      bg="secondary"
      marginX="1rem"
      icon={colorMode === "dark" ? MdLightMode : MdDarkMode}
      onClick={toggleColorMode}
    />
  )
}
