import { ChakraProvider } from "@chakra-ui/react"
import { theme } from "../styles/theme"
import { AppProps } from "next/app"
import { Layout } from "../layout"
import { TimezoneContextProvider } from "../contexts/timezone"
import { CurrencyContextProvider } from "../contexts/currency"

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <TimezoneContextProvider>
        <CurrencyContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CurrencyContextProvider>
      </TimezoneContextProvider>
    </ChakraProvider>
  )
}
