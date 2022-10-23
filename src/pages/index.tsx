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
  useDisclosure,
} from "@chakra-ui/react"
import { MdArrowBack } from "react-icons/md"
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
        >
          <Box as="header" padding="2.25rem 1rem">
            <IconProfile
              country={timezone.country}
              title={timezone.city}
              text={timezone.offsetName}
              onOpen={modal.onOpen}
            />
          </Box>
          <NavBar />
          <Box as="footer" paddingY="2.25rem">
            <ToggleThemeItem />
          </Box>
        </Flex>
        <Flex
          flexGrow="1"
          maxHeight="100vh"
          flexDir="column"
          overflowY="auto"
          padding={["0", "5rem"]}
          position="relative"
        >
          <Flex
            marginY="1.5rem"
            alignItems="center"
            justifyContent="space-between"
            display={["flex", "none"]}
            position="sticky"
            top="0"
          >
            <IconProfile
              country={timezone.country}
              title={timezone.city}
              text={timezone.offsetName}
              onOpen={modal.onOpen}
            />
            <ToggleThemeButton />
          </Flex>
          <Flex flexDir="column" overflowY="auto" height="100%">
            <Heading
              fontSize={["1.25rem", "1.5rem"]}
              margin={["1rem", "0"]}
              marginBottom={{ sm: "1.5rem" }}
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
              justifyContent="center"
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
