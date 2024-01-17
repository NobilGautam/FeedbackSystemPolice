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
import emailjs from "emailjs-com";
import { useSupabase } from "../context/SupabaseContext";

function Grivance() {
  const { tableData: policeData } = useSupabase();
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
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

    const serviceId = "service_iq3klrn";
    const templateId = "template_grwkcgj";
    const userId = "J7e9RNG6UyRKw69xz";

    try {
      const data = {
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        subject: formData.subject,
        policeStation: formData.policeStation,
        explanation: formData.explanation,
      };

      if (formData.supportingMedia) {
        const file = formData.supportingMedia;
        const reader = new FileReader();

        reader.onloadend = function() {
          const base64data = reader.result.split(",")[1];
          const blob = new Blob([base64data], { type: file.type });

          data.supportingMedia = blob;
          emailjs.send(serviceId, templateId, data, userId).then(
            (response) => {
              console.log("Email sent successfully!", response);
            },
            (error) => {
              console.error("Error sending email:", error);
            }
          );
        };

        reader.readAsDataURL(file);
      } else {
        await emailjs.send(serviceId, templateId, data, userId);
        console.log("Email sent successfully!");
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
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
          <Select>
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
          <FormLabel className="mt-4">Supporting Media</FormLabel>
          <Input
            type="file"
            size="sm"
            name="supportingMedia"
            onChange={handleFileChange}
          />
          <FormHelperText>
            Upload any supporting media (image, video, etc.)
          </FormHelperText>
        </FormControl>

        <Button type="submit" className="mt-4 customButton">
          Submit
        </Button>
      </form>
    </Flex>
  );
}

export default Grivance;
