import { Box, List, ListItem, ListProps, Text } from "@chakra-ui/react"
import {
  MdOutlineCalculate,
  MdOutlineMonetizationOn,
  MdOutlineSchedule,
} from "react-icons/md"
import { MenuItem } from "./menu-item"

interface NavBarProps extends ListProps {}

export function NavBar({ children, ...rest }: NavBarProps) {
  return (
    <Box as="nav" height="100%" width="100%">
      <List display="flex" flexDir="column" {...rest}>
        <ListItem>
          <MenuItem>
            <MdOutlineSchedule />
            <Text>Tabela de Horários</Text>
          </MenuItem>
        </ListItem>
        <ListItem>
          <MenuItem>
            <MdOutlineMonetizationOn />
            <Text>Tabela de Preços</Text>
          </MenuItem>
        </ListItem>
        <ListItem>
          <MenuItem>
            <MdOutlineCalculate />
            <Text>Calcular Pacote</Text>
          </MenuItem>
        </ListItem>
        {children && <ListItem>{children}</ListItem>}
      </List>
    </Box>
  )
}
