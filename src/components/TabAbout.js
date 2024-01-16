/* eslint-disable no-redeclare */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";
import { BsStarFill } from "react-icons/bs";
import map from "../assets/map.png";
import { useSupabase } from "../context/SupabaseContext";
import { IoCallOutline, IoMailOutline } from "react-icons/io5";
import { GoogleMap, useJsApiLoader, useLoadScript } from '@react-google-maps/api';
function TabAbout({ policeData }) {
  const [stars, setStars] = useState([]);
  const { allPolice } = useSupabase();
  useEffect(() => {
    let number = 0;
    for (var i = 0; i < allPolice.length; i++) {
      if (allPolice[i].policeStation === policeData.name) {
        number = allPolice[i].ps_Rating;
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
  }, [policeData, allPolice]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY,
  });
  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row w-[52%] justify-between">
        <h1 className="text-xl md:text-3xl font-semibold text-[#8C4E1D]">
          {policeData.name}
        </h1>
        <Text color="blue.600" className="flex mt-1">
          {stars.map((tag, index) => (
            <span className="text-xl md:text-2xl" key={index}>
              {tag}
            </span>
          ))}
        </Text>
      </div>
      <Text fontSize="md" className="mt-4">
        <div className="text-lg md:text-xl flex flex-col">
          {" "}
          <span className="text-[#8c4e1d] font-semibold">PINCODE</span>{" "}
          <span className="mt-1">{policeData.address}</span>{" "}
        </div>
      </Text>
      <div className="map-container mt-5">
        <h1 className="text-[#8c4e1d] text-lg md:text-xl font-semibold">Location</h1>
        {
          isLoaded ? (
            <GoogleMap
              center={{ lat: 40.3947365, lng: 49.6898045 }}
              zoom={10}
              mapContainerStyle={{width:"100%",height:"100%"}}
            >

            </GoogleMap>
          ) : <img src={map} alt="Map" className="text-2xl"></img>
        }
      </div>
      <div className="mt-10 flex flex-col md:flex-row gap-2">
        <div className="flex flex-row gap-2">
        <IoCallOutline />
        <span className="text-[#8c4e1d] font-semibold">Contact Number: </span>
        </div>
        <a href={"tel:" + policeData.Phone_Number} className="ml-[8%] md:ml-0 hover:text-[#886ef1] duration-200">{policeData.Phone_Number}</a>
      </div>
      <div className="flex flex-col md:flex-row gap-2 mt-2">
        <div className="flex flex-row gap-2">
        <IoMailOutline/>
        <span className="text-[#8c4e1d] font-semibold">Contact Email: </span>
        </div>
        <a href={"mailto:" + policeData.email} className="ml-[8%] md:ml-0 hover:text-[#886ef1] duration-200">{policeData.email}</a>
      </div>
    </div>
  );
}

export default TabAbout;
