/* eslint-disable array-callback-return */
import React from "react";
import { Auth } from "../Firebase";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import SingleFeedbackPost from "../components/SingleFeedbackPost";
import { useSupabase } from "../context/SupabaseContext";

const Feedback = () => {
  const { fetchVisits, visits, tableData: PoliceData } = useSupabase();
  const [policeStations, setPoliceStations] = useState(PoliceData);
  const [user] = useAuthState(Auth);
  const [ImgLinks, setImgLinks] = useState(new Map());
  const [addressLinks, setAddressLinks] = useState(new Map());

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

  return (
    <div className="mt-24 py-10 ">
      {visits.map((item) => {
        if (item.feedback) {
          return (
            <SingleFeedbackPost
              key={item.id}
              ImgLinks={ImgLinks}
              addressLinks={addressLinks}
              item={item}
            />
          );
        }
      })}
    </div>
  );
};

export default Feedback;
