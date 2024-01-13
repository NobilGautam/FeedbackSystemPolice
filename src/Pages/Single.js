import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import {
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import TabAbout from "../components/TabAbout";
import TabReviews from "../components/TabReviews";
import TabData from "../components/TabData";
import { useSupabase } from "../context/SupabaseContext";
import { IoMdArrowBack } from "react-icons/io"; //
function Single() {
  const { id } = useParams();
  const {
    setShow2,
    QR,
    tableData: policeStations,
    setIndividual,
  } = useSupabase();
  const [policeData, setPoliceData] = useState({});
  const navigator = useNavigate();

  useEffect(() => {
    if (policeStations) {
      let temp = {};
      for (let i = 0; i < policeStations.length; i++) {
        if (policeStations[i].id === Number(id)) {
          temp = policeStations[i];
          break;
        }
      }
      setPoliceData(temp);
    }
  }, [id, policeStations]);
  if (!policeData) return null;
  const handleClick = () => {
    setIndividual(policeData.name);
    if (QR) {
      setShow2(true);
    }

    navigator("/newVisit");
  };
  const handleClick2 = () => {
    setShow2(false);
    navigator("/");
  };

  return (
    <div>
      <div className="container mt-32 mx-auto flex items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 mt-16 gap-24 max-h-screen w-full">
          <div className="flex items-center flex-col justify-center h-full">
            <Button
              size={"lg"}
              className="customButton self-start"
              onClick={handleClick2}
            >
              {" "}
              <span className="text-lg flex items-center">
                <IoMdArrowBack />
                Back to All Post
              </span>{" "}
            </Button>
            <img
              src={policeData.image}
              alt="police station"
              className="w-full mt-10 h-auto drop-shadow-lg object-cover rounded-xl"
            />
            <div className="w-[100%] mt-4 flex items-center justify-between">
              <Button
                size={"lg"}
                className="w-[48%] customButton"
                onClick={handleClick}
              >
                {" "}
                <span className="text-xl">Mark as Visited</span>{" "}
              </Button>
              <Button size={"lg"} isDisabled={true} className="w-[48%]">
                {" "}
                <span className="text-xl">Fill Feedback</span>
              </Button>
            </div>
          </div>

          <Tabs
            isLazy
            defaultIndex={0}
            isFitted
            variant="enclosed"
            className="mt-10"
          >
            <TabList>
              <Tab _selected={{ color: "white", bg: "#8C4E1D" }}>
                <span className="text-xl font-semibold">About</span>
              </Tab>
              <Tab _selected={{ color: "white", bg: "#8C4E1D" }}>
                <span className="text-xl font-semibold">Reviews</span>
              </Tab>
              <Tab _selected={{ color: "white", bg: "#8C4E1D" }}>
                <span className="text-xl font-semibold">Data</span>
              </Tab>
            </TabList>
            <TabPanels className="drop-shadow-lg h-[90%]">
              <TabPanel className="h-full" bgColor={"#FFFFFF"}>
                <TabAbout policeData={policeData} />
              </TabPanel>
              <TabPanel className="h-full overflow-scroll" bgColor={"#FFFFFF"}>
                <TabReviews policeStationName={policeData.name} />
              </TabPanel>
              <TabPanel className="h-full" bgColor={"#FFFFFF"}>
                <TabData policeData={policeData} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default Single;
