import { ModalProps, Center, Flex } from "@chakra-ui/react"
import { useEffect, useRef } from "react"

const animationDuration = 200
export function Modal({ isOpen, onClose, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>()
  useEffect(() => {
    const boxRef = modalRef.current.childNodes[0] as HTMLDivElement
    const input = document.getElementsByTagName("input")[0] as HTMLInputElement
    if (isOpen) {
      modalRef.current.style.display = "flex"
      boxRef.style.animation = `${animationDuration}ms forwards scale-in`
      input.focus()
    } else {
      boxRef.style.animation = `${animationDuration}ms forwards scale-out`
      setTimeout(() => {
        modalRef.current.style.display = isOpen ? "flex" : "none"
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
      ref={modalRef}
      display="none"
    >
      <Flex
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
