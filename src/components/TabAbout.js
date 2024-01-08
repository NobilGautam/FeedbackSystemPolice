/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";
import { BsStarFill } from "react-icons/bs";
import map from "../assets/map.png";
import { useSupabase } from "../context/SupabaseContext";
function TabAbout({ policeData }) {
  const [stars, setStars] = useState([]);
  let number = Number(policeData.rating);
  const {allPolice}=useSupabase();
  useEffect(() => {
  
    let number=0;
  for(var i=0; i<allPolice.length; i++){
    if(allPolice[i].policeStation===policeData.name){
      number=allPolice[i].ps_Rating;
    
      break;
    }
  }
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
   
    
  }, [policeData,allPolice]);
  return (
    <div className="p-4">
      <div className="flex flex-row w-[52%] justify-between">
        <h1 className="text-3xl font-semibold text-[#8C4E1D]">
          {policeData.name}
        </h1>
        <Text color="blue.600" fontSize="md" className="flex mt-1">
          {stars.map((tag, index) => (
            <span className="text-2xl" key={index}>
              {tag}
            </span>
          ))}
        </Text>
      </div>
      <Text fontSize="md" className="mt-4">
        <div className="text-xl flex flex-col"> <span className="text-[#8c4e1d] font-semibold">PINCODE</span> <span className="mt-1">{policeData.address}</span> </div>
      </Text>
      <div className="map-container mt-5">
        <h1 className="text-[#8c4e1d] text-xl font-semibold">Location</h1>

        <img src={map} alt="Map" className="text-2xl"></img>
      </div>
    </div>
  );
}

export default TabAbout;
