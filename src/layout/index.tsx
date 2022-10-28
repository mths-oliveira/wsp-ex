import { Box, Flex, Grid, Image, useDisclosure } from "@chakra-ui/react"
import { MdSearch } from "react-icons/md"
import { IconButton } from "../components/icon-button"
import { NavBar } from "../components/navbar"
import { ToggleThemeButton } from "../components/toggle-theme-button"
import { ReactNode } from "react"
import { useTimezoneContext } from "../contexts/timezone"
import { IconInput } from "../components/icon-input"
import { useRouter } from "next/router"
import { useCurrencyContext } from "../contexts/currency"

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const router = useRouter()
  const timeZoneContext = useTimezoneContext()
  const currencyContext = useCurrencyContext()

  const isTimezone = router.asPath.replace(/\W/, "") === "horarios"
  return (
    <>
      <Grid
        ref={(ref) => {
          if (!ref) return
          ref.style.height = `${window.innerHeight}px`
        }}
        maxHeight="100vh"
        gridTemplateColumns={["1fr", "15rem minmax(auto, 60rem) 0"]}
        gridColumnGap="3.5rem"
        gridTemplateRows={["3.5rem 1fr 4rem", "4rem 1fr"]}
        gridTemplateAreas={[
          `"top" "main" "bottom"`,
          `"aside top" "aside main"`,
        ]}
      >
        <Flex
          as="header"
          gridArea="top"
          alignItems="center"
          justifyContent="space-between"
          borderBottom="sm"
          borderColor="tertiary"
          position="sticky"
          top="0"
          bg="primary"
        >
          <ToggleThemeButton />
          <Image
            src="favicon.png"
            height="3rem"
            marginX="0.25rem"
            alt="monstros da wsp"
            display={["initial", "none"]}
          />
          <Box
            cursor="pointer"
            width={["fit-content", "22.5rem"]}
            onClick={
              isTimezone
                ? timeZoneContext.modal.onOpen
                : currencyContext.modal.onOpen
            }
          >
            <IconButton display={["flex", "none"]} icon={MdSearch} />
            <IconInput display={["none", "flex"]} pointerEvents="none" />
          </Box>
        </Flex>
        <Flex
          as="aside"
          display={["none", "flex"]}
          flexDirection="column"
          height="100vh"
          width="15rem"
          borderRight="sm"
          borderColor="tertiary"
          position="fixed"
          top="0"
          left="0"
        >
          <Box as="header" padding="3.5rem">
            <Image src="favicon.png" alt="monstros da wsp" />
          </Box>
          <NavBar flexDir="column" />
        </Flex>
        <Flex as="main" flexDirection="column" gridArea="main">
          {children}
        </Flex>
        <Box
          as="footer"
          display={["initial", "none"]}
          position="sticky"
          bottom="0"
        >
          <NavBar
            gridArea="bottom"
            height="4rem"
            justifyContent="space-evenly"
            alignItems="center"
            borderTop="sm"
            borderColor="tertiary"
            bg="primary"
          />
        </Box>
      </Grid>
    </>
  )
}
