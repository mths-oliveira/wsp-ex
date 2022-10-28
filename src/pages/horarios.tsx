import {
  Box,
  Heading,
  TableCaption,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { ClassesController } from "../backend/controllers/classes"
import { Timezone } from "../backend/models/timezone"

import { Table } from "../components/table"
import { TableContainer } from "../components/table-container"
import { useTimezoneContext } from "../contexts/timezone"

const classesController = new ClassesController()

interface TimerProps {
  timezone: Timezone
}

function getTimeString() {
  const date = new Date()
  const time = date.toTimeString().substring(0, 5)
  return time
}

function Timer({ timezone }: TimerProps) {
  const [time, setTime] = useState("00:00")
  useEffect(updateTime, [])
  function updateTime(timeout = 60_000) {
    const time = getTimeString()
    setTime(time)
    setTimeout(updateTime, timeout)
  }
  return (
    <Box paddingX={["1rem", "0"]}>
      <Text fontSize="1.5rem">{timezone.convertTime(time)}</Text>
      <Text>
        Horário em {timezone.city}, {timezone.country}
      </Text>
    </Box>
  )
}

export default function () {
  const { timezone } = useTimezoneContext()
  const classes = classesController.findAllClassesInTimeZone(timezone)
  return (
    <Box paddingY="3.5rem">
      <Timer timezone={timezone} />
      <Heading
        fontSize="1.5rem"
        marginBottom="1.5rem"
        marginTop="2.5rem"
        marginLeft={["1rem", "0"]}
      >
        Tabela de Horários
      </Heading>
      <TableContainer>
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
      </TableContainer>
    </Box>
  )
}
