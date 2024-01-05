import React, { useEffect, useState } from "react";
import SingleVisitPost from "../components/SingleVisitPost";
import { useAuthState } from "react-firebase-hooks/auth";
import { Auth } from "../Firebase";
import { useSupabase } from "../context/SupabaseContext";
import { ColorRing } from "react-loader-spinner";
import { Spinner } from "@chakra-ui/react";

const MyVisits = () => {
  const [user] = useAuthState(Auth);
  const { fetchVisits, visits,visitsLoader, tableData: PoliceData} = useSupabase();
  
  const [policeStations, setPoliceStations] = useState([]);
  const [imgLinks, setImgLinks] = useState(new Map());
  const [addressLinks, setAddressLinks] = useState(new Map());

  
  const sortMethods = {
    none: { method: null },
    name: { method: "name" },
    name_dsc: { method: "name" },
    rating: { method: "rating" },
    rating_dsc: { method: "rating" },
  };
  useEffect(() => {
    if (user) {
      fetchVisits(user.email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const matching_PS = [];
    setPoliceStations(PoliceData);

    for (var i = 0; i < visits.length; i++) {
      const Ps = visits[i].policeStation;
      for (var j = 0; j < policeStations.length; j++) {
        if (Ps === policeStations[j].name) {
          matching_PS.push(policeStations[j]);
        }
      }
    }
    const ImgUrls = new Map();
    const Address = new Map();
    for (var k = 0; k < matching_PS.length; k++) {
      ImgUrls.set(matching_PS[k].name, matching_PS[k].image);
      Address.set(matching_PS[k].name, matching_PS[k].address);
    }
    setImgLinks(ImgUrls);
    setAddressLinks(Address);
  }, [PoliceData, policeStations, visits]);

  if (visitsLoader) {
    return (
      <div className="flex justify-center items-center y my-auto mx-auto">
        <h1 className="mt-32 text-center text-[#8c4e1d] text-5xl">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="#8C4E1D"
            size="xl"
          />
        </h1>
      </div>
    );
  }
  

  return (
    <div className="mt-24 py-10">
      {visits.length === 0 ? (
        <h1>Loading...</h1>
      ) : (
        visits
          .sort((a, b) => (a.feedback === null ? -1 : 1)) // Sort by feedback (null first)
          .map((item) => (
            <SingleVisitPost
              key={item.id}
              ImgLinks={imgLinks}
              addressLinks={addressLinks}
              item={item}
              documentId={item.documentID}
            />
          ))
      )}
    </div>
  );
};

export default MyVisits;
