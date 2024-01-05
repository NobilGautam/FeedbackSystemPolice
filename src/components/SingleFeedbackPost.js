/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import "../index.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Card, CardBody, CardFooter, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function SingleFeedbackPost({ item, ImgLinks, addressLinks }) {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const formatTimestamp = (timestamp) => {
    const date = timestamp ? new Date(timestamp) : null;

    if (date) {
      // Set options for formatting
      const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
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
      {/* <div className="flex justify-center my-8 min-h-max max-h-max lg:hover:scale-105 duration-300">
        <div className="flex lg:flex-row w-[80%] flex-col lg:justify-between rounded-lg overflow-hidden shadow-md shadow-[#8e8e8e9a] bg-[#f6bd85]">
          <div className="flex lg:flex-row flex-col w-[100%] lg:justify-between lg:items-center lg:w-[30%]">
            <img
              src={ImgLinks.get(item.policeStation)}
              className="lg:w-[80%] lg:h-[100%] aspect-[16/9] object-cover"
              alt={`${item.name} Police Station Picture`}
            ></img>
            <h2 className="text-[1.2rem] mt-2 ml-0 md:mt-0 md:ml-8 font-bold text-center w-[100%]">
              {item.policeStation}
            </h2>
          </div>
          <div className="flex text-center items-center mt-2 md:mt-0 lg:text-[1.2rem] font-light justify-center lg:w-[40%]">
            {addressLinks.get(item.policeStation)}
          </div>
          <div
            className={`flex items-center min-h-max bg-zinc-50 p-4 mt-2 md:mt-0 font-light lg:w-[30%] justify-center ${
              item.Feel < 0 ? "text-red-600" : "text-green-700"
            }`}
          >
            {item.feedback}
          </div>
        </div>
      </div> */}
      <Card 
        direction={{base: 'column', sm: 'row'}}  
        overflow='hidden'
        variant='outline'
        className="my-4 mx-20 rounded-2xl hover:scale-105 duration-300"
        background='#eed0b2'
        borderRadius='[20px]'
        style={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 10px -1px rgba(0, 0, 0, 0.2)' }}
      >
        <Image 
          objectFit='cover'
          maxW={{base:'100%', sm:'200px'}}
          src={ImgLinks.get(item.policeStation)}
          alt={`${item.name} Police Station Picture`}
        />

        <Stack>
          <CardBody>
            <Heading size='md'>{item.policeStation}</Heading>
            <p className="py-2">
              <span className="font-semibold">ADDRESS: </span>{addressLinks.get(item.policeStation)}
            </p>
            <p className="py-2">
            <span className="font-semibold">Reporting Date & Time: </span>{formatTimestamp(item.created_at)}
            </p>
          </CardBody>
          <CardFooter>
            <div>
              <p className="font-semibold">FEEDBACK:</p>
              <p className={`flex items-center min-h-max p-4 mt-2 md:mt-0 font-light justify-center ${
              item.Feel < 0 ? "text-red-600" : "text-green-700"
            }`}>{item.feedback}</p>
            </div>
          </CardFooter>
        </Stack>
      </Card>
    </div>
  );
}

export default SingleFeedbackPost;
