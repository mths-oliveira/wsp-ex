import { ModalProps, Center, Flex } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"

const animationDuration = 200
export function Modal({ isOpen, onClose, children }: ModalProps) {
  const [display, setDisplay] = useState<"none" | "flex">("none")
  const [animation, setAnimation] = useState<"scale-out" | "scale-in">(
    "scale-out"
  )
  useEffect(() => {
    if (isOpen) {
      const input = document.getElementsByTagName("input")[0]
      input.focus()
      setDisplay("flex")
      setAnimation("scale-in")
    } else {
      setAnimation("scale-out")
      setTimeout(() => {
        setDisplay("none")
      }, animationDuration)
    }
  }, [isOpen])
  return (
    <Center
      bg="rgba(0,0,0,0.5)"
      position="fixed"
      zIndex={10}
      inset="0"
      onClick={onClose}
      display={display}
    >
      <Flex
        animation={`${animationDuration}ms forwards ${animation}`}
        flexDirection="column"
        bg="primary"
        overflowY="auto"
        height={["100%", "calc(100% - 7rem)"]}
        maxWidth="25rem"
        width="100%"
        borderRadius="md"
        onClick={(e) => {
          e.stopPropagation()
        }}
        sx={{
          "&>ul": {
            position: "relative",
            overflowY: "auto",
            height: "100%",
          },
          "&>div": {
            padding: "1.5rem 1rem",
          },
        }}
      >
        {children}
      </Flex>
    </Center>
  )
}
