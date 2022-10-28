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
import {
  CurrencyController,
  currencyData,
} from "../backend/controllers/currency"
import { Currency, CurrencyImp } from "../backend/models/currency"
import { FlagImage } from "../components/flag-image"
import { IconButton } from "../components/icon-button"
import { IconInput } from "../components/icon-input"
import { Modal } from "../components/modal"
import { removeAccent } from "../utils/remove-accent"

interface Context {
  currency: Currency
  currencyData: currencyData
  setCurrency: (currency: Currency) => void
  currencies: currencyData[]
  modal: UseDisclosureProps
}

const CurrencyContext = createContext({} as Context)

interface Props {
  children: ReactNode
}

interface ModalContentProps {
  setCurrency: (currency: Currency) => void
  onClose: () => void
}

function ModalContent({ setCurrency, onClose }: ModalContentProps) {
  const [query, setQuery] = useState("")
  const regexp = RegExp(removeAccent(query), "i")
  function filter(currency: currencyData) {
    return Boolean(
      regexp.exec(removeAccent(currency.name)) ||
        regexp.exec(removeAccent(currency.country))
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
        {currencies.filter(filter).map((currencyData, i) => (
          <ListItem
            key={currencyData.code}
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
            onClick={async () => {
              const currency = await CurrencyImp.getInstance(currencyData.code)
              setCurrency(currency)
              onClose()
            }}
          >
            <Flex alignItems="center">
              <FlagImage country={currencyData.country} />
              <Box fontWeight="600">
                <Text>{currencyData.name}</Text>
                <Text fontSize="14px" color="altText">
                  {currencyData.code}
                </Text>
              </Box>
            </Flex>
          </ListItem>
        ))}
      </List>
    </>
  )
}

const currencyController = new CurrencyController()
const currencies = currencyController.listAllCurrencies()

const initialCurrecy: Currency = {
  code: "BRL",
  symbol: "R$",
  value: 1,
}

export function CurrencyContextProvider({ children }: Props) {
  const modal = useDisclosure()
  const [currency, setCurrency] = useState(initialCurrecy)
  const currencyData = currencyController.fetchCurrencyDataByCode(currency.code)
  return (
    <CurrencyContext.Provider
      value={{ currencies, currency, setCurrency, modal, currencyData }}
    >
      {children}
      <Modal isOpen={modal.isOpen} onClose={modal.onClose}>
        <ModalContent onClose={modal.onClose} setCurrency={setCurrency} />
      </Modal>
    </CurrencyContext.Provider>
  )
}

export function useCurrencyContext() {
  const context = useContext(CurrencyContext)
  return context
}
