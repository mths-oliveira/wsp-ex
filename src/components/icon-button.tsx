import {
  Center,
  CenterProps,
  Icon,
  ComponentWithAs,
  IconProps,
} from "@chakra-ui/react"
import { IconType } from "react-icons/lib"

interface IconButtonProps extends CenterProps {
  icon: IconType | ComponentWithAs<"svg", IconProps>
}

export function IconButton({ icon, fontSize, ...rest }: IconButtonProps) {
  return (
    <Center as="button" width="48px" height="48px" borderRadius="md" {...rest}>
      <Icon as={icon} fontSize={fontSize} />
    </Center>
  )
}
