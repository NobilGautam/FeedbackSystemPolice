import {
  Button,
  Card,
  CardBody,
  Heading,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { decrypt } from "n-krypta";
import React, { useState } from "react";
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
import { useSupabase } from "../context/SupabaseContext";

const IndFeedback = ({ item }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const { fetchVisits, updateVisit } = useSupabase();
  const toast = useToast();
  const [commentValue, setCommentValue] = useState("");

  const handleSave = async (documentID, comment) => {
    try {
      const fetchedVisits = await fetchVisits(null, documentID);

      if (fetchedVisits.length === 0) {
        toast({
          title: "DocumentID Not Found",
          description: "An error occurred while updating visit information.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        throw new Error("No matching feedback found for the given Document ID");
      } else {
        await updateVisit(documentID, null, null, comment);
      }
    } catch (error) {
      console.error("Error in runAfterSubmit:", error.message);
      toast({
        title: "Update Failed",
        description: "An error occurred while updating visit information.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      throw error;
    }
    onClose();
  };

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
            <br />
            {decrypt(item.feedback, toString(process.env.REACT_APP_SECRET_KEY))}
          </Text>
          <Button
            isDisabled={item.comment}
            className="customButton"
            onClick={onOpen}
          >
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
              <ModalHeader className="bg-[#8C4E1D] text-white">
                Add Your Comment
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody bgColor="white" pb={6}>
                <FormControl className="bg-white" mt={4}>
                  <FormLabel>Comment</FormLabel>
                  <Input
                    value={commentValue}
                    onChange={(e) => setCommentValue(e.target.value)}
                    height="200px"
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter bgColor="white">
                <Button
                  className="customButton mr-2"
                  onClick={() => handleSave(item.documentID, commentValue)}
                >
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
