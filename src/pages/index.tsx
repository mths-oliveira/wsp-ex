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
import { ProductsController } from "../backend/controllers/products"
import { Table } from "../components/table"
import { TableContainer } from "../components/table-container"
import { useCurrencyContext } from "../contexts/currency"
import { currencyMask } from "../utils/currency-mask"

const productsController = new ProductsController()

export default function () {
  const { currency, currencyData } = useCurrencyContext()
  const products = productsController.findAllValuesToCurrencyQuote(
    currency.value
  )
  return (
    <Box paddingY="3.5rem">
      <Box
        paddingX={["1rem", "0"]}
        marginBottom="2.5rem"
        display={currency.code === "BRL" ? "none" : "block"}
      >
        <Text>1 {currencyData.name} igual a</Text>
        <Text fontSize="1.5rem">{currencyMask(currency.value)} Reais</Text>
      </Box>
      <Heading
        fontSize="1.5rem"
        marginBottom="1.5rem"
        marginLeft={["1rem", "0"]}
      >
        Tabela de Preços
      </Heading>
      <TableContainer>
        <Table>
          <TableCaption>
            Horas em que começam a primeira e a última aula. (Horário de{" "}
            timezone.city, timezone.country
          </TableCaption>
          <Thead>
            <Tr>
              <Th>Pagamento</Th>
              <Th>Produto</Th>
              <Th isNumeric>Preço</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map(({ name, payment, value }) => (
              <Tr key={payment + name} whiteSpace="nowrap">
                <Td>{payment}</Td>
                <Td width="100%">{name}</Td>
                <Td
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  fontWeight="600"
                >
                  <Text>{currency.symbol}</Text>
                  <Text marginLeft="0.25rem">{value}</Text>
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Pagamento</Th>
              <Th>Produto</Th>
              <Th isNumeric>Preço</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Box>
  )
}
