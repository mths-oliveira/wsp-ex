import { useColorMode } from "@chakra-ui/react"
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md"
import { IconButton } from "./icon-button"

export function ToggleThemeButton() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <IconButton
      flexShrink="0"
      icon={colorMode === "dark" ? MdOutlineLightMode : MdOutlineDarkMode}
      onClick={toggleColorMode}
    />
  )
}
