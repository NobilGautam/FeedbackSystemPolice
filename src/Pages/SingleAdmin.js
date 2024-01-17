import React, { useEffect } from "react";
import { useSupabase } from "../context/SupabaseContext";
import { useState } from "react";
import { useParams } from "react-router";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import TabData from "../components/TabData";

function SingleAdmin({ isAdminLoggedin }) {
  // When the application starts
  const storedToken = sessionStorage.getItem("authToken");
  const isAuthenticated = !!storedToken;
  const { fetchPSstatsName, psstatsLoading ,psStatsData } = useSupabase();
  const { pincode } = useParams();
  const [ps, setPs] = useState([]);
  useEffect(() => {
    const fetching = async () => {
      await fetchPSstatsName(pincode)
      setPs(psStatsData);
    };
    fetching()
  }, [pincode]);

  console.log(psStatsData[0])
  console.log(ps)

  if (!isAuthenticated) {
    return <h1 className="mt-32">Login admin first</h1>;
  }
  if (psstatsLoading) {
    return <h1 className="mt-32">Loading...</h1>;
  }

  return (
    <div className="mt-32">
      <Tabs
        isLazy
        defaultIndex={0}
        isFitted
        variant="enclosed"
        className="md:mt-10 w-[80%]"
      >
        <TabList>
          <Tab _selected={{ color: "white", bg: "#8C4E1D" }}>
            <span>Data</span>
          </Tab>
          <Tab _selected={{ color: "white", bg: "#8C4E1D" }}>
            <span>Feedbacks</span>
          </Tab>
          <Tab _selected={{ color: "white", bg: "#8C4E1D" }}>
            <span>Grievances</span>
          </Tab>
        </TabList>
        <TabPanels className="drop-shadow-lg h-[90%]">
          <TabPanel bgColor={"#FFFFFF"}>
            <TabData policeData={psStatsData[0].policeStation} />
          </TabPanel>
          <TabPanel bgColor={"#FFFFFF"}></TabPanel>
          <TabPanel bgColor={"#FFFFFF"}></TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default SingleAdmin;
