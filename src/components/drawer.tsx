import { ModalProps, Flex, Box } from "@chakra-ui/react"
import { useEffect, useState } from "react"

const animationDuration = 300
export function Drawer({ isOpen, onClose, children }: ModalProps) {
  const [display, setDisplay] = useState<"none" | "flex">("none")
  const [animation, setAnimation] = useState<"slade-x-out" | "slade-x-in">(
    "slade-x-out"
  )
  useEffect(() => {
    if (isOpen) {
      setDisplay("flex")
      setAnimation("slade-x-in")
    } else {
      setAnimation("slade-x-out")
      setTimeout(() => {
        setDisplay("none")
      }, animationDuration)
    }
  }, [isOpen])
  return (
    <>
      <Flex
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
        {children}
      </Flex>
      <Box display={{ md: "none" }}>
        <Flex
          bg="rgba(0,0,0,0.5)"
          position="fixed"
          zIndex={5}
          inset="0"
          onClick={onClose}
          display={display}
        >
          <Flex
            animation={`${animationDuration}ms forwards ${animation}`}
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
            {children}
          </Flex>
        </Flex>
      </Box>
    </>
  )
}
