import { Button, Card, CardBody, Heading, Stack, Text } from "@chakra-ui/react";
import { decrypt } from "n-krypta";
import React from "react";
import {
  ModalOverlay,
  useDisclosure,
  ModalContent,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
Input,
 
  ModalBody,
  ModalHeader,
  Modal,
} from "@chakra-ui/react";

const IndFeedback = ({ item }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      className="mb-4"
    >
      <Stack>
        <CardBody>
          <Heading size="md">{item.name}</Heading>
          <Text py="2">
            <span className=" font-semibold">Regarding: {item.purpose}</span>
            <br/>
            {decrypt(item.feedback,toString(process.env.REACT_APP_SECRET_KEY))}
          </Text>
          <Button className="customButton" onClick={onOpen}>
            Comment
          </Button>

          
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent className="adminModal">
          <ModalHeader>Add Your Comment</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            

            <FormControl mt={4}>
              <FormLabel>Comment</FormLabel>
              <Input placeholder='Last name' />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
        </CardBody>
      </Stack>
    </Card>
  );
};

export default IndFeedback;
