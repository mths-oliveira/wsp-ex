import { ModalProps, Flex, Box } from "@chakra-ui/react"
import { useEffect, useRef } from "react"

const animationDuration = 300
export function Drawer({ isOpen, onClose, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>()
  useEffect(() => {
    const boxRef = modalRef.current.childNodes[0] as HTMLDivElement
    if (isOpen) {
      modalRef.current.style.display = "flex"
      boxRef.style.animation = `${animationDuration}ms forwards slade-x-in`
    } else {
      boxRef.style.animation = `${animationDuration}ms forwards slade-x-out`
      setTimeout(() => {
        modalRef.current.style.display = isOpen ? "flex" : "none"
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
          ref={modalRef}
          onClick={onClose}
        >
          <Flex
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
