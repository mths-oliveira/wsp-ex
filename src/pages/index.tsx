import {
  Box,
  Flex,
  Heading,
  List,
  ListItem,
  Stack,
  StackProps,
  TableCaption,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react"
import {
  MdArrowBack,
  MdChangeCircle,
  MdMenu,
  MdOutlineCalculate,
  MdOutlineDarkMode,
  MdOutlineLightMode,
  MdOutlineMonetizationOn,
  MdOutlineSchedule,
} from "react-icons/md"
import { useState } from "react"
import { ClassesController } from "../backend/controllers/classes"
import { Timezone, TimezoneImp } from "../backend/models/timezone"
import { FlagImage } from "../components/flag-image"
import { IconButton } from "../components/icon-button"
import { IconInput } from "../components/icon-input"
import { Modal } from "../components/modal"
import { Table } from "../components/table"
import { debounce } from "../utils/debounce"
import { AnimatedListItem } from "../components/animate-list-item"
import { TimezoneController } from "../backend/controllers/timezones"
import { Profile } from "../components/profile"
import { removeAccent } from "../utils/remove-accent"
import { Drawer } from "../components/drawer"

function MenuItem(props: StackProps) {
  return (
    <Stack
      spacing="1rem"
      direction="row"
      alignItems="center"
      padding="1rem 1.5rem"
      cursor="pointer"
      _hover={{
        bg: "secondary",
      }}
      {...props}
    />
  )
}

const classesController = new ClassesController()
const timezoneController = new TimezoneController()
const timezones = timezoneController.listAllTimezones()
const initialTimezone = new TimezoneImp("America/Sao_Paulo")

export default function () {
  const modal = useDisclosure()
  const drawer = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()
  const [timezone, setTimezone] = useState(initialTimezone)
  const classes = classesController.findAllClassesInTimeZone(timezone.offset)
  const [query, setQuery] = useState("")
  const regexp = RegExp(removeAccent(query), "i")
  function filter(timezone: Timezone) {
    if (query.match(/^GMT?$/i)) return true
    if (query.match(/[\d+:-]/)) {
      return Boolean(timezone.offsetName.includes(query.toUpperCase()))
    }
    return Boolean(
      regexp.exec(removeAccent(timezone.city)) ||
        regexp.exec(removeAccent(timezone.country))
    )
  }
  const filteredTimezones = timezones.filter(filter)
  return (
    <Flex width="100vw" height="100vh">
      <Modal isOpen={modal.isOpen} onClose={modal.onClose}>
        <Flex>
          <IconButton
            icon={MdArrowBack}
            marginX="0.5rem"
            onClick={modal.onClose}
          />
          <IconInput
            placeholder=""
            onChange={debounce((e) => {
              setQuery(e.target.value)
            })}
          />
        </Flex>
        <List>
          {filteredTimezones.length > 0 ? (
            filteredTimezones.map((timezone, i) => (
              <AnimatedListItem
                index={i}
                key={timezone.city}
                onClick={() => {
                  setTimezone(timezone)
                  modal.onClose()
                }}
              >
                <Profile
                  country={timezone.country}
                  title={timezone.city}
                  text={timezone.offsetName}
                />
              </AnimatedListItem>
            ))
          ) : (
            <Text as="li" padding="1.5rem" fontWeight="600">
              Nenhum resultado encontrado para: "{query}"
            </Text>
          )}
        </List>
      </Modal>
      <Drawer isOpen={drawer.isOpen} onClose={drawer.onClose}>
        <Flex
          flexDir="column"
          alignItems="center"
          textAlign="center"
          onClick={modal.onOpen}
          as="header"
          padding="2.25rem 1rem"
          cursor="pointer"
        >
          <Box position="relative">
            <FlagImage country={timezone.country} width="5rem" />
            <Box
              position="absolute"
              bottom="0.5rem"
              right="0.5rem"
              bg="primary"
              padding="2px"
              borderRadius="full"
            >
              <MdChangeCircle />
            </Box>
          </Box>
          <Box fontWeight="600">
            <Text>{timezone.city}</Text>
            <Text fontSize="sm" color="altText">
              {timezone.offsetName}
            </Text>
          </Box>
        </Flex>
        <Box height="100%" as="nav">
          <List>
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
          </List>
        </Box>
        <Box as="footer" paddingY="2.25rem">
          <MenuItem onClick={toggleColorMode}>
            {colorMode === "dark" ? (
              <>
                <MdOutlineLightMode />
                <Text>Modo Claro</Text>
              </>
            ) : (
              <>
                <MdOutlineDarkMode />
                <Text>Modo Escuro</Text>
              </>
            )}
          </MenuItem>
        </Box>
      </Drawer>
      <Flex
        flexGrow="1"
        flexDir="column"
        overflowY="auto"
        padding={["0", "5rem"]}
      >
        <Heading
          fontSize="1.5rem"
          marginBottom="1.5rem"
          display={["none", "inline"]}
        >
          Tabela de Horários
        </Heading>
        <Flex
          marginY="1rem"
          alignItems="center"
          justifyContent="space-between"
          display={["flex", "none"]}
        >
          <Profile
            onClick={modal.onOpen}
            country={timezone.country}
            title={timezone.city}
            text={timezone.offsetName}
          />
          <IconButton
            icon={MdMenu}
            marginX="1rem"
            fontSize="1.5rem"
            bg="secondary"
            onClick={drawer.onOpen}
          />
        </Flex>
        <Box
          border="sm"
          borderRadius="md"
          borderColor={["transparent", "borderColor"]}
          padding={["0", "1rem"]}
          maxWidth="60rem"
        >
          <Table>
            <TableCaption>
              Horas em que começam a primeira e a última aula. (Horário de{" "}
              {timezone.city}, {timezone.country})
            </TableCaption>
            <Thead>
              <Tr>
                <Th>Dias</Th>
                <Th>De</Th>
                <Th>Às</Th>
              </Tr>
            </Thead>
            <Tbody>
              {classes.map(
                ({ firstClassSchedule, lastClassSchedule, weekdays }) => (
                  <Tr key={weekdays}>
                    <Td width="100%">{weekdays}</Td>
                    <Td>{firstClassSchedule}</Td>
                    <Td>{lastClassSchedule}</Td>
                  </Tr>
                )
              )}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Dias</Th>
                <Th>De</Th>
                <Th>Às</Th>
              </Tr>
            </Tfoot>
          </Table>
        </Box>
      </Flex>
    </Flex>
  )
}
