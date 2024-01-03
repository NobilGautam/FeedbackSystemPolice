import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import PoliceData from "../components/data";
import { useState } from "react";
import { BsStarFill } from "react-icons/bs";

import { Text } from "@chakra-ui/react";
function Single() {
  const { id } = useParams();
  console.log(id);
  const [stars, setStars] = useState([]);
  const [policeData, setPoliceData] = useState({});
  useEffect(() => {
    let ps = {};
    for (let i = 0; i < PoliceData.length; i++) {
      if (PoliceData[i].id === Number(id)) {
        ps = PoliceData[i];
        setPoliceData(PoliceData[i]);
        break;
      }
    }
    const number = Number(ps.rating);
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
  }, [id]);

  // setPoliceData(temp);
  // console.log(temp);
  // console.log(policeData);

  return (
    <div className="mt-32">
      <Link to="/">
        <Button className="customButton">Back to All Posts</Button>
      </Link>
      <div className="parent grid lg:grid-cols-2 w-[100%]  grid-cols-1 mx-auto gap-0">
        <div className="imgC w-[90%] mt-5 mx-auto">
          <img src={policeData.image} alt="police station" className="w-[100%]"></img>
        </div>
        <div className="info w-[90%] mx-auto mt-5">
          <h1 className="md:text-6xl  text-3xl font-sans text-[#8C4E1D] font-bold">
            {policeData.name}
          </h1>
          <Text color="blue.600" fontSize="sm" className="flex">
            {stars.map((tag, index) => (
              <span key={index} className="text-2xl brightness-[95%]">
                {tag}
              </span>
            ))}
          </Text>
          <div className="secondary info  font-sans font-semibold">
            <h2 className="py-2 mt-2  text-lg">Number of male Officers:</h2>
            <h2 className="py-2 mt-2 text-lg">Number of Female Officers:</h2>
            <h2 className="py-2 mt-2 text-lg">Total Contstables:</h2>
            <h2 className="py-2 mt-2 text-lg">Total inspectors:</h2>
            <h2 className="py-2 mt-2 text-lg">Location:</h2>
          </div>
          <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        </div>
      </div>
    </div>
  );
}

export default Single;
