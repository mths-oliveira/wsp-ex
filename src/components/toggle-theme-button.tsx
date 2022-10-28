import { useColorMode } from "@chakra-ui/react"
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md"
import { IconButton } from "./icon-button"

export function ToggleThemeButton() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <IconButton
      bg={["transparent", "secondary"]}
      flexShrink="0"
      icon={colorMode === "dark" ? MdOutlineLightMode : MdDarkMode}
      onClick={toggleColorMode}
    />
  )
}
