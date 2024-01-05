import React, { useEffect, useState } from "react";
import SingleVisitPost from "../components/SingleVisitPost";
import { useAuthState } from "react-firebase-hooks/auth";
import { Auth } from "../Firebase";
import { useSupabase } from "../context/SupabaseContext";
import { ColorRing } from "react-loader-spinner";

const MyVisits = () => {
  const [user] = useAuthState(Auth);
  const { fetchVisits, visits,visitsLoader, tableData: PoliceData} = useSupabase();
  
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

  if(visitsLoader){
    return  (<div className="flex justify-center items-center y my-auto mx-auto">
    <h1 className="mt-32 text-center text-[#8c4e1d] text-5xl">
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={["#8C4E1D", "#8C4E1D", "#8C4E1D", "#8C4E1D", "#8C4E1D"]}
      />
    </h1>
  </div>)
  }
  

  return (
    <div className="mt-24 py-10">
      {visits.length === 0 ? (
        <h1>Loading...</h1>
      ) : (
        <div>
       { visits.map((item) =>{
          if(!item.feedback){
            return (<SingleVisitPost
            key={item.id}
            ImgLinks={imgLinks}
            addressLinks={addressLinks}
            item={item}
            documentId={item.documentID}
          /> )
          }
        } )
      }
        { visits.map((item) =>{
          if(item.feedback){
            return (<SingleVisitPost
            key={item.id}
            ImgLinks={imgLinks}
            addressLinks={addressLinks}
            item={item}
            documentId={item.documentID}
          /> )
          }
        } )
      }
</div>
      
        
      )
      
      }
    </div>
  );
};

export default MyVisits;
