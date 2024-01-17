/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import "../index.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Heading,
  IconButton,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { decrypt } from "n-krypta";
import { Share } from "react-twitter-widgets";
import { useTranslation } from "react-i18next";
import { IoPencilOutline } from "react-icons/io5";
import { useNavigate } from "react-router";

function SingleFeedbackPost({ item, ImgLinks, addressLinks, blink }) {
  const { t } = useTranslation();
  const match = item.policeStation.match(/(\d+)$/);
  const cityNumber = match ? match[1] : null;
  const cityName = item.policeStation.replace(/\d+$/, "").trim();
  const navigator = useNavigate()
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    if (blink) {
      setIsBlinking(true);

      const timeoutId = setTimeout(() => {
        setIsBlinking(false);
      }, 60000);

      return () => clearTimeout(timeoutId);
    }
  }, [blink]);

  const navigate = () => {
    navigator(`/followupform/${item.documentID}`)
  }

  const formatTimestamp = (timestamp) => {
    const date = timestamp ? new Date(timestamp) : null;

    if (date) {
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
    <div data-aos="fade-up" id="feedback">
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        className="my-4 mx-10 md:mx-20 rounded-2xl shadow-md hover:scale-105 duration-300"
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
            <Heading size="md">{`${t(
              `policeStation.${cityName}`
            )} ${cityNumber}`}</Heading>
            <p className="py-2">
              <span className="font-semibold">{t("home.address")}: </span>
              {addressLinks.get(item.policeStation)}
            </p>
            <p className="py-2">
              <span className="font-semibold">{t("myFeedback.rdt")}</span>
              {formatTimestamp(item.created_at)}
            </p>
            <span className="font-semibold">Status:</span>
            <Box className={`${isBlinking ? 'animate-blink' : ''} w-fit`} border="1px solid #ccc" p={2} borderRadius="md" display="flex" alignItems="center">
              <Text className="mr-4" flex="1">{item.follow_up || "No Status Set"}</Text>
                <IconButton onClick={navigate} isDisabled={item.follow_up === "Resolved"} icon={<IoPencilOutline />} aria-label="Edit" colorScheme="orange"/>
            </Box>
          </CardBody>
          <CardFooter>
            <div>
              <p className="font-semibold">{t("myFeedback.feedback")}</p>
              <p
                className={`${
                  item.Feel < 0 ? "text-red-600" : "text-green-700"
                }`}
              >
                {decrypt(item.feedback, toString(process.env.SECRET_KEY))}
              </p>
              <blockquote>
                <Share
                  className="tweet"
                  url="https://feedback-system-police-private.vercel.app/"
                  options={{
                    text: `During my recent visit to the #${
                      item.policeStation.replace(' ','')
                    } Police station regarding ${item.purpose}, \nI experienced ${decrypt(
                      item.feedback,
                      toString(process.env.SECRET_KEY)
                    )}\n@PoliceRajasthan @RajPoliceHelp \n I submitted and am sharing this feedback using Rajasthan Police Station Feedback Portal `,
                    size: "large",
                  }}
                ></Share>
              </blockquote>
            </div>
          </CardFooter>
        </Stack>
      </Card>
    </div>
  );
}

export default SingleFeedbackPost;
