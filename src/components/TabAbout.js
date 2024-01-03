/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import PoliceData from "../components/data";
import { Text } from "@chakra-ui/react";
import { BsStarFill } from "react-icons/bs";

function TabAbout() {
  const { id } = useParams();
  const [stars, setStars] = useState([]);
  const PoliceStation = PoliceData[Number(id)-1]
  useEffect(() => {
    const number = Number(PoliceStation.rating);
    const temp = [];
    for (var i = 0; i < 5; i++) {
      if (i < number) {
        temp.push(
          <span key={i}>
            <BsStarFill color="gold" />
          </span>
        );
      } else {
        temp.push(
          <span key={i}>
            <BsStarFill color="grey" />
          </span>
        );
      }
    }
    setStars(temp);
  }, []);
  return (
    <div className="flex items-center">
        <h1>{PoliceStation.name}</h1>
      <Text color="blue.600" fontSize="md" className="flex">
        {stars.map((tag, index) => (
          <span key={index}>{tag}</span>
        ))}
      </Text>
    </div>
  );
}

export default TabAbout;
