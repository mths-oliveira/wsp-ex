import {
  Box,
  Flex,
  List,
  ListItem,
  Text,
  useDisclosure,
  UseDisclosureProps,
} from "@chakra-ui/react"
import { createContext, ReactNode, useContext, useState } from "react"
import { MdArrowBack } from "react-icons/md"
import { TimezoneController } from "../backend/controllers/timezones"
import { Timezone, TimezoneImp } from "../backend/models/timezone"
import { FlagImage } from "../components/flag-image"
import { IconButton } from "../components/icon-button"
import { IconInput } from "../components/icon-input"
import { Modal } from "../components/modal"
import { removeAccent } from "../utils/remove-accent"

interface Context {
  timezone: Timezone
  timezones: Timezone[]
  setTimezone: (timezone: Timezone) => void
  modal: UseDisclosureProps
}

const TimezoneContext = createContext({} as Context)

interface Props {
  children: ReactNode
}

interface ModalContentProps {
  setTimezone: (timezone: Timezone) => void
  onClose: () => void
}

function ModalContent({ setTimezone, onClose }: ModalContentProps) {
  const [query, setQuery] = useState("")
  const regexp = RegExp(removeAccent(query), "i")
  function filter(timezone: Timezone) {
    return Boolean(
      regexp.exec(removeAccent(timezone.city)) ||
        regexp.exec(removeAccent(timezone.country))
    )
  }
  return (
    <>
      <Flex padding="1.5rem 1rem">
        <IconButton icon={MdArrowBack} onClick={onClose} marginX="0.5rem" />
        <IconInput
          onChange={(e) => {
            setQuery(e.target.value)
          }}
          inputRef={(ref) => {
            if (!ref) return
            setTimeout(() => {
              ref.focus()
            }, 200)
          }}
        />
      </Flex>
      <List position="relative" overflowY="auto" height="100%">
        {timezones.filter(filter).map((timezone, i) => (
          <ListItem
            key={timezone.city}
            position="absolute"
            top={`${i * 64}px`}
            opacity={0}
            transition="top 0.3s"
            animation="0.3s forwards slade-in"
            cursor="pointer"
            bg="primary"
            width="100%"
            _hover={{
              bg: "secondary",
            }}
            onClick={() => {
              setTimezone(timezone)
              onClose()
            }}
          >
            <Flex alignItems="center">
              <FlagImage country={timezone.country} />
              <Box fontWeight="600">
                <Text>{timezone.city}</Text>
                <Text fontSize="14px" color="altText">
                  {timezone.offsetName}
                </Text>
              </Box>
            </Flex>
          </ListItem>
        ))}
      </List>
    </>
  )
}

const timezoneController = new TimezoneController()
const timezones = timezoneController.listAllTimezones()
const initialTimezone = new TimezoneImp("America/Sao_Paulo")

export function TimezoneContextProvider({ children }: Props) {
  const modal = useDisclosure()
  const [timezone, setTimezone] = useState(initialTimezone)

  return (
    <TimezoneContext.Provider
      value={{ timezone, setTimezone, timezones, modal }}
    >
      {children}
      <Modal isOpen={modal.isOpen} onClose={modal.onClose}>
        <ModalContent onClose={modal.onClose} setTimezone={setTimezone} />
      </Modal>
    </TimezoneContext.Provider>
  )
}

export function useTimezoneContext() {
  const context = useContext(TimezoneContext)
  return context
}
