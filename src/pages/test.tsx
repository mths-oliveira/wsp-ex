import {
  Box,
  BoxProps,
  Flex,
  Grid,
  Heading,
  Image,
  TableCaption,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { MdSearch } from "react-icons/md"
import { ClassesController } from "../backend/controllers/classes"
import { Timezone } from "../backend/models/timezone"
import { FlagImage } from "../components/flag-image"
import { IconButton } from "../components/icon-button"
import { IconInput } from "../components/icon-input"
import { NavBar } from "../components/navbar"
import { Profile } from "../components/profile"
import { Table } from "../components/table"
import { ToggleThemeButton } from "../components/toggle-theme-button"

function TableContainer(props: BoxProps) {
  return (
    <Box
      border="sm"
      borderRadius="md"
      borderColor={["transparent", "tertiary"]}
      padding={["0", "1rem"]}
      maxWidth="60rem"
      {...props}
    />
  )
}

const classesController = new ClassesController()

export default function () {
  const timezone: Timezone = {
    city: "Brasília",
    country: "Brasil",
    offset: -180,
    offsetName: "GMT-03:00",
  }
  const classes = classesController.findAllClassesInTimeZone(timezone.offset)
  return (
    <Grid
      height="100vh"
      gridTemplateColumns={["1fr", "15rem 1fr"]}
      gridTemplateRows={["3.5rem 1fr 4rem", "3.5rem 1fr"]}
      gridTemplateAreas={[`"top" "main" "bottom"`, `"aside top" "aside main"`]}
    >
      <Flex
        as="header"
        gridArea="top"
        borderBottom="sm"
        borderColor="tertiary"
        alignItems="center"
        justifyContent="space-between"
        paddingX="0.5rem"
        bg="primary"
      >
        <Image
          src="favicon.png"
          height="3rem"
          marginX="0.25rem"
          alt="monstros da wsp"
        />

        <Box
          flexShrink="0"
          marginLeft={["auto", "initial"]}
          width={["fit-content", "22.5rem"]}
          cursor="pointer"
          onClick={() => {
            console.log("open")
          }}
        >
          <IconButton icon={MdSearch} display={["flex", "none"]} />
          <IconInput pointerEvents="none" display={["none", "flex"]} />
        </Box>
        <ToggleThemeButton />
      </Flex>
      <Flex
        as="aside"
        gridArea="aside"
        display={["none", "flex"]}
        flexDirection="column"
        borderRight="sm"
        borderColor="tertiary"
      >
        <Box as="header" marginY="3.5rem">
          <Flex alignItems="center" flexDir="column" textAlign="center">
            <FlagImage country={timezone.country} width="5rem" />
            <Box fontWeight="600" marginBottom="-0.5rem">
              <Text>{timezone.city}</Text>
              <Text fontSize="14px" color="altText">
                {timezone.offsetName}
              </Text>
            </Box>
          </Flex>
        </Box>
        <NavBar flexDir="column" />
      </Flex>
      <Flex as="main" flexDirection="column" gridArea="main" overflowY="auto">
        <Box padding={["3.5rem 0", "3.5rem"]}>
          <Heading
            fontSize="1.5rem"
            marginBottom="1.5rem"
            marginLeft={["1rem"]}
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
      </Flex>
      <Box
        as="footer"
        gridArea="bottom"
        position="fixed"
        bottom="0"
        width="100%"
        bg="primary"
      >
        <NavBar
          height="4rem"
          display={["flex", "none"]}
          justifyContent="space-evenly"
          alignItems="center"
          borderTop="sm"
          borderColor="tertiary"
        />
      </Box>
    </Grid>
  )
}
