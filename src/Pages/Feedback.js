/* eslint-disable array-callback-return */
import React from "react";
import { Auth } from "../Firebase";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import SingleFeedbackPost from "../components/SingleFeedbackPost";
import { useSupabase } from "../context/SupabaseContext";
import { Button,Input } from "@chakra-ui/react";

const Feedback = () => {
  const { fetchVisits, visits,setVisits, globalVisits,tableData: PoliceData } = useSupabase();
  const [policeStations, setPoliceStations] = useState(PoliceData);
  const [user] = useAuthState(Auth);
  const [ImgLinks, setImgLinks] = useState(new Map());
  const [addressLinks, setAddressLinks] = useState(new Map());
  const [searchTerm, setSearchTerm] = useState("");
  const [flag, setFlag] = useState(true);
  const [sortState, setSortState] = useState("name");

  
  const sortMethods = {
    none: { method: null },
    name: { method: "name" },
    name_dsc: { method: "name" },
    rating: { method: "rating" },
    rating_dsc: { method: "rating" },
    day_Reported:{method:"created_at"}
  };


  useEffect(() => {
    if (user) {
      fetchVisits(user.email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const sort = (sortState) => {
    if (sortState === "name" || sortState === "rating" || sortState==="day_Reported" )
        visits.sort(sortBy(sortMethods[sortState].method));
    else visits.sort(sortByRev(sortMethods[sortState].method));
    setFlag(!flag);
  };

  const [myFeedbacks,setMyFeedbacks]=useState([]);
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
  
  
  const sortBy = (field) => (a, b) =>
    (a[field] > b[field]) - (a[field] < b[field]);
  const sortByRev = (field) => (a, b) =>
    (a[field] < b[field]) - (a[field] > b[field]);

    

  const handlechange = (e) => {
    setSearchTerm(e.target.value);
  };
const handleSubmit=(e)=>{

  e.preventDefault();
  console.log(searchTerm);
    if (searchTerm.trimStart().length === 0) {
    alert("Please type a valid Police Station");
    return;
  }
console.log(visits);
  const temp = globalVisits.filter((item) =>
    item.policeStation.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log(temp);
 ;
  setVisits(temp);
}
  
  
  return (
    <div className="mt-24 py-10 ">
      <div className="w-[80%] mx-auto  flex flex-col md:flex-row items-center pt-3 justify-between" >
      <form className="flex w-full md:w-[50%]" onSubmit={handleSubmit}>
          <Input
            placeholder="Search Police Stations"
            onChange={handlechange}
            className="searchBar shadow-md"
          />

          <Button className="customButton mx-4" type="submit">
            Search
          </Button>
        </form>
        <div className="flex mt-4 md:mt-0">
          <select
            defaultValue="None"
            className="border rounded px-4 py-2 shadow-md bg-white"
            onChange={(e) => setSortState(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="name_dsc">Name Dsc</option>
            <option value="rating">Rating</option>
            <option value="rating_dsc">Rating Dsc</option>
            <option value="day_Reported">Day Reported</option>
          </select>
          <Button className="customButton mx-4" onClick={() => sort(sortState)}>
            Sort
          </Button>
        </div>
      </div>
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
