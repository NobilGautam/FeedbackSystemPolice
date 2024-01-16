import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  VStack,
  Button,
  Flex,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useSupabase } from "../context/SupabaseContext";
import { useNavigate } from "react-router";

function FollowupForm() {
  const [documentId, setDocumentId] = useState("");
  const [status, setStatus] = useState("Resolved");
  const [isValidDocumentId, setIsValidDocumentId] = useState(true);
  const { fetchVisits, updateVisit } = useSupabase();
  const toast = useToast();
  const navigator = useNavigate();

  const validateDocumentId = () => {
    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    setIsValidDocumentId(uuidRegex.test(documentId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateDocumentId();

    if (isValidDocumentId) {
      try {
        await runAfterSubmit(documentId, status);
        toast({
          title: "Submission Successful",
          description: "Your form has been submitted successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigator("/");

      } catch (error) {
        console.error("Error in handleSubmit:", error.message);
      }
    } else {
      console.error("Invalid Document ID format");
      toast({
        title: "Invalid Document ID",
        description: "Please enter a valid Document ID.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const runAfterSubmit = async (documentID, status) => {
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
        await updateVisit(documentID, null, status);
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
  };

  return (
    <Flex justify="center" align="center" h="100vh">
      <form onSubmit={handleSubmit} className="w-[80%] bg-white p-4 rounded-md">
        <FormControl isRequired>
          <FormLabel>Document ID</FormLabel>
          <Input
            type="text"
            size="sm"
            placeholder="73f88cac-11d3-4f32-aebb-a3fc06fbfbbc"
            value={documentId}
            onChange={(e) => setDocumentId(e.target.value)}
            onBlur={validateDocumentId}
            isInvalid={!isValidDocumentId}
          />
          <FormHelperText>
            You can find it in the Text Message received during the visit
          </FormHelperText>
          <FormLabel className="mt-4" as="legend">
            Status of Your Enquiry / FIR
          </FormLabel>
          <RadioGroup value={status} onChange={(value) => setStatus(value)}>
            <VStack spacing="12px" align="left">
              <Radio value="Resolved">Resolved</Radio>
              <Radio value="Resolving">Resolving</Radio>
              <Radio value="No Response">No Response</Radio>
            </VStack>
          </RadioGroup>
          <FormHelperText>
            Your response will help Rajasthan Police work efficiently
          </FormHelperText>
        </FormControl>

        <Button type="submit" className="mt-4 customButton">
          Submit
        </Button>
      </form>
    </Flex>
  );
}

export default FollowupForm;
