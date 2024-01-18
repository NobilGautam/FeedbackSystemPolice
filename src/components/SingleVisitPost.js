/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import "../index.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

function SingleVisitPost({ item, ImgLinks, addressLinks, documentId }) {
  const { t } = useTranslation();
  const match = item.policeStation.match(/(\d+)$/);
  const cityNumber = match ? match[1] : null;
  const cityName = item.policeStation.replace(/\d+$/, "").trim();
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
            <Heading size="md">{`${t(
              `policeStation.${cityName}`
            )} ${cityNumber}`}</Heading>
            <p className="py-2">
              <span className="font-semibold">{t("home.address")} - </span>
              {addressLinks.get(item.policeStation)}
            </p>
            <p className="py-2">
              <span className="font-semibold">{t("myFeedback.rdt")}</span>
              {formatTimestamp(item.created_at)}
            </p>
          </CardBody>
          <CardFooter>
            <div className="mb-4">
              {item.feedback !== null ? (
                <Button isDisabled className="customButton">
                  {t("myVisits.feedbackAdded")}
                </Button>
              ) : (
                <Link to={`/newFeedback/${documentId}`}>
                  <Button className="customButton">
                    {t("myVisits.addFeedback")}
                  </Button>
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
