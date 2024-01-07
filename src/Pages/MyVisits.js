import React, { useEffect, useState } from "react";
import SingleVisitPost from "../components/SingleVisitPost";
import { useAuthState } from "react-firebase-hooks/auth";
import { Auth } from "../Firebase";
import { useSupabase } from "../context/SupabaseContext";
import { ColorRing } from "react-loader-spinner";
import { Spinner } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";

const MyVisits = () => {
  const [user] = useAuthState(Auth);
  const { fetchVisits, visits,visitsLoader,globalVisits,setVisits, tableData: PoliceData} = useSupabase();

  
  const [policeStations, setPoliceStations] = useState([]);
  const [imgLinks, setImgLinks] = useState(new Map());
  const [addressLinks, setAddressLinks] = useState(new Map());
  const [searchTerm, setSearchTerm] = useState("");
  const [flag, setFlag] = useState(true);
  const [sortState, setSortState] = useState("name");
  const [gflag,setGflag]=useState(true);
  
  const sortMethods = {
    none: { method: null },
    name: { method: "policeStation" },
    name_dsc: { method: "policeStation" },
     
    day_Reported:{method:"created_at"}
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
  const sort = (sortState) => {
   
    if (sortState === "name" || sortState === "rating" || sortState==="day_Reported" )
        visits.sort(sortBy(sortMethods[sortState].method));
    else visits.sort(sortByRev(sortMethods[sortState].method));
    setFlag(!flag);
 setGflag(false);
    
  };
  
  const sortBy = (field) => (a, b) =>
    (a[field] > b[field]) - (a[field] < b[field]);
  const sortByRev = (field) => (a, b) =>
    (a[field] < b[field]) - (a[field] > b[field]);

    const handleSubmit=(e)=>{
      e.preventDefault();
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

  const handleChange=(e)=>{
    setSearchTerm(e.target.value)
  
  }
  
  
  if (visitsLoader) {
    return (
     
        <h1 className="mt-32 text-center text-[#8c4e1d] text-5xl">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="#8C4E1D"
            size="xl"
          />
        </h1>
  
    );
  }
  
console.log(visits);
  return (
    <div className="mt-24 py-10">
      {visits.length === 0 ? (
        <h1>Loading...</h1>
      ) : (
        <div>
              <div className="w-[80%] mx-auto  flex flex-col md:flex-row items-center pt-3 justify-between" >
      <form className="flex w-full md:w-[50%]" onSubmit={handleSubmit}>
          <Input
            placeholder="Search Police Stations"
            onChange={handleChange}
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
          <Button className="customButton mx-4" onClick={()=>{
            sort(sortState)
          }} >
            Sort
          </Button>
        </div>
      </div>
          {<div>
            
            { gflag?visits.sort((a, b) => {
              if (a.feedback === null && b.feedback === null) {
                // If both have feedback as null, sort by shorter policeStation name
                if (a.policeStation.length !== b.policeStation.length) {
                  return a.policeStation.length - b.policeStation.length;
                } else {
                  // If lengths are equal, sort by lexicographical order
                  return a.policeStation.localeCompare(b.policeStation);
                }
              } else if (a.feedback === null) {
                // If only 'a' has null feedback, 'a' comes before 'b'
                return -1;
              } else {
                // If 'b' has null feedback or both have feedback, 'b' comes before 'a'
                return 1;
              }
            })
          .map((item) => (
            <SingleVisitPost
              key={item.id}
              ImgLinks={imgLinks}
              addressLinks={addressLinks}
              item={item}
              documentId={item.documentID}
            />
          ))




:visits
.map((item) => (
<SingleVisitPost
  key={item.id}
  ImgLinks={imgLinks}
  addressLinks={addressLinks}
  item={item}
  documentId={item.documentID}
/>
))



}
          
          </div>
          }
          </div>
      )}
    </div>
  );
};

export default MyVisits;
