import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useSupabase } from "../context/SupabaseContext";

function Grievance() {
  const { tableData: policeData, griSubmit } = useSupabase();
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    subject: "",
    policeStation: "",
    explanation: "",
    supportingMedia: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      supportingMedia: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await griSubmit(formData);
    console.log("Done", formData);
  };

  return (
    <Flex justify="center" align="center" h="100vh" className="mt-32">
      <form onSubmit={handleSubmit} className="w-[80%] bg-white p-4 rounded-md">
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            size="sm"
            placeholder="ABC XYZ"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <FormLabel className="mt-4">Phone Number</FormLabel>
          <Input
            type="text"
            size="sm"
            placeholder="+919999999999"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
          <FormLabel className="mt-4">Email</FormLabel>
          <Input
            type="email"
            size="sm"
            placeholder="abc@gmail.com"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <FormLabel className="mt-4" as="legend">
            Subject of Grivance
          </FormLabel>
          <Input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
          />
          <FormHelperText>Explain your issue in one line</FormHelperText>
          <FormLabel className="mt-4" as="legend">
            Select Police Station
          </FormLabel>
          <Select
            value={formData.policeStation}
            onChange={(e) =>
              handleInputChange({
                target: { name: "policeStation", value: e.target.value },
              })
            }
          >
            {policeData.map((data) => (
              <option key={data.id} value={data.name}>
                {data.name}
              </option>
            ))}
          </Select>
          <FormLabel className="mt-4" as="legend">
            Explain
          </FormLabel>
          <Input
            type="text"
            name="explanation"
            value={formData.explanation}
            onChange={handleInputChange}
          />
          <FormHelperText>
            Elaborate issue face with Rajasthan Police
          </FormHelperText>
          {/* <FormLabel className="mt-4">Supporting Media</FormLabel>
          <Input
            type="file"
            size="sm"
            name="supportingMedia"
            onChange={handleFileChange}
          />
          <FormHelperText>
            Upload any supporting media (image, video, etc.)
          </FormHelperText> */}
        </FormControl>

        <Button type="submit" className="mt-4 customButton">
          Submit
        </Button>
      </form>
    </Flex>
  );
}

export default Grievance;
