/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import "../index.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
} from "@chakra-ui/react";

function SingleVisitPost({ item, ImgLinks, addressLinks, documentId }) {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const formatTimestamp = (timestamp) => {
    const date = timestamp ? new Date(timestamp) : null;

    if (date) {
      // Set options for formatting
      const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "Asia/Kolkata",
      };

      const formattedDateTime = date.toLocaleString("en-IN", options);
      return formattedDateTime;
    }

    return "N/A";
  };

  return (
    <div data-aos="fade-up">
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        className="my-4 mx-10 md:mx-20 rounded-2xl hover:scale-105 duration-300"
        background="#F0F0F0"
        borderRadius="[20px]"
        border={"solid"}
        borderColor={"#8C4E1D"}
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "30%" }}
          src={ImgLinks.get(item.policeStation)}
          alt={`${item.name} Police Station Picture`}
        />

        <Stack>
          <CardBody>
            <Heading size="md">{item.policeStation}</Heading>
            <p className="py-2">
              <span className="font-semibold">Address - </span>
              {addressLinks.get(item.policeStation)}
            </p>
            <p className="py-2">
              <span className="font-semibold">Reporting Date & Time - </span>
              {formatTimestamp(item.created_at)}
            </p>
          </CardBody>
          <CardFooter>
            <div className="mb-4">
              {item.feedback !== null ? (
                <span className="bg-[#c69665] text-white p-4 rounded-xl font-semibold">
                  Feedback Added!
                </span>
              ) : (
                <Link to={`/newFeedback/${documentId}`}>
                  <span className="bg-[#c69665] text-white p-4 rounded-xl font-semibold duration-300">
                    Add Feedback
                  </span>
                </Link>
              )}
            </div>
          </CardFooter>
        </Stack>
      </Card>
    </div>
  );
}

export default SingleVisitPost;
