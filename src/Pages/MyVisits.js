import React, { useEffect, useState } from "react";
import SingleVisitPost from "../components/SingleVisitPost";
import { useAuthState } from "react-firebase-hooks/auth";
import { Auth } from "../Firebase";
import { useSupabase } from "../context/SupabaseContext";

const MyVisits = () => {
  const [user] = useAuthState(Auth);
  const { fetchVisits, visits, tableData: PoliceData } = useSupabase();
  const [policeStations, setPoliceStations] = useState([]);
  const [imgLinks, setImgLinks] = useState(new Map());
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
    <div className="mt-24 py-10">
      {visits.length === 0 ? (
        <h1>Loading...</h1>
      ) : (
        visits
          .filter((item) => item.feedback === null) // Filter out items with non-null feedback
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
