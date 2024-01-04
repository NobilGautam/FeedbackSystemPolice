/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
// import PoliceData from "../components/data";
import { Text } from "@chakra-ui/react";
import { BsStarFill } from "react-icons/bs";
import map from '../assets/map.png'
function TabAbout({policeData}) {
  const { id } = useParams();
  const [stars, setStars] = useState([]);
 let number=Number(policeData.rating);

  
  useEffect(() => {
  
  
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
  }, [policeData]);
  return (
    <div className="flex flex-col justify-center">
        <h1 className="text-3xl">{policeData.name}</h1>
  
      <Text color="blue.600" fontSize="md" className="flex mt-1">
        {stars.map((tag, index) => (
          <span  className='text-2xl' key={index}>{tag}</span>
        ))}
      </Text>

      <Text  fontSize="md" className="flex mt-1 text-[#8c4e1d] font-semibold">
       <span className="text-xl"> PINCODE: {policeData.address}</span>
      
      </Text>
      <div className="map-container mt-5">

        <h1 className="text-[#8c4e1d] text-xl font-semibold">LOCATION:</h1>

        <img src={map} className="text-2xl"></img>
      </div>

    </div>
  );
}

export default TabAbout;
