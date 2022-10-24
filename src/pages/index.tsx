import {
  Box,
  Flex,
  Heading,
  List,
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
  MdDarkMode,
  MdOutlineDarkMode,
  MdOutlineLightMode,
  MdSearch,
} from "react-icons/md"
import { useState } from "react"
import { ClassesController } from "../backend/controllers/classes"
import { Timezone, TimezoneImp } from "../backend/models/timezone"
import { IconButton } from "../components/icon-button"
import { IconInput } from "../components/icon-input"
import { Modal } from "../components/modal"
import { Table } from "../components/table"
import { debounce } from "../utils/debounce"
import { AnimatedListItem } from "../components/animate-list-item"
import { TimezoneController } from "../backend/controllers/timezones"
import { Profile } from "../components/profile"
import { removeAccent } from "../utils/remove-accent"
import { IconProfile } from "../components/icon-profile"
import { NavBar } from "../components/navbar"
import { ToggleThemeButton } from "../components/toggle-theme-button"
import { ToggleThemeItem } from "../components/toggle-theme-item"

const classesController = new ClassesController()
const timezoneController = new TimezoneController()
const timezones = timezoneController.listAllTimezones()
const initialTimezone = new TimezoneImp("America/Sao_Paulo")

export default function () {
  const modal = useDisclosure()
  const { toggleColorMode, colorMode } = useColorMode()
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
    <>
      <Flex width="100vw" height="100vh">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          position="sticky"
          top="0"
          borderBottom="sm"
          borderColor="borderColor"
          padding="0.25rem"
        >
          <IconButton
            icon={colorMode === "dark" ? MdOutlineDarkMode : MdOutlineLightMode}
            onClick={toggleColorMode}
          />
          <IconButton icon={MdSearch} onClick={modal.onOpen} />
        </Flex>
        <Flex
          as="aside"
          display={["none", "flex"]}
          height="100%"
          width="15rem"
          flexShrink="0"
          flexDirection="column"
          bg="primary"
          border="sm"
          borderColor="borderColor"
          onClick={(e) => {
            e.stopPropagation()
          }}
        ></Flex>
        <Flex
          flexGrow="1"
          flexDir="column"
          overflowY="auto"
          position="relative"
        >
          <Flex flexDir="column" overflowY="auto" height="100%">
            <Profile
              marginY="1rem"
              country={timezone.country}
              text={timezone.offsetName}
              title={timezone.city}
            />
            <Heading
              fontSize="1.5rem"
              marginLeft={["1rem", "0"]}
              marginBottom="1.5rem"
            >
              Tabela de Horários
            </Heading>
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
          <Flex
            as="footer"
            display={{ sm: "none" }}
            position="sticky"
            bottom="0"
          >
            <NavBar
              flexDir="row"
              justifyContent="space-evenly"
              borderTop="sm"
              borderColor="borderColor"
            />
          </Flex>
        </Flex>
      </Flex>
      <Modal isOpen={modal.isOpen} onClose={modal.onClose}>
        <Flex>
          <IconButton
            icon={MdArrowBack}
            marginX="0.5rem"
            onClick={modal.onClose}
          />
          <IconInput
            placeholder="País, cidade ou fuso horário"
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
    </>
  )
}
