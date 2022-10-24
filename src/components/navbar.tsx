import {
  Box,
  List,
  ListItem,
  ListProps,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react"
import {
  MdCalendarToday,
  MdOutlineCalculate,
  MdOutlineMonetizationOn,
  MdOutlineSchedule,
} from "react-icons/md"
import { MenuItem } from "./menu-item"

interface NavBarProps extends ListProps {}

export function NavBar({ children, ...rest }: NavBarProps) {
  const isMobile = useBreakpointValue([true, false])

  return (
    <Box as="nav">
      <List display="flex" {...rest}>
        <ListItem>
          <MenuItem>
            <MdOutlineCalculate />
            <Text>{isMobile ? "Calcular" : "Calcular Pacote"}</Text>
          </MenuItem>
        </ListItem>
        <ListItem>
          <MenuItem>
            <MdOutlineMonetizationOn />
            <Text>{isMobile ? "Preços" : "Tabela de Preços"}</Text>
          </MenuItem>
        </ListItem>
        <ListItem>
          <MenuItem>
            <MdCalendarToday />
            <Text>{isMobile ? "Agendar" : "Agendar Aulas"}</Text>
          </MenuItem>
        </ListItem>
        <ListItem>
          <MenuItem>
            <MdOutlineSchedule />
            <Text>{isMobile ? "Horários" : "Tabela de Horários"}</Text>
          </MenuItem>
        </ListItem>
      </List>
    </Box>
  )
}
