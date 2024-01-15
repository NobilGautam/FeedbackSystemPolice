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
import { IoMdArrowBack } from "react-icons/io"; 
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

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
      <div className="container mt-12 p-6 pb-12 md:p-0 md:mt-32 mx-auto flex items-center justify-center">
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
                {t("single.backToAllPosts")}
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
                <span className="text-lg md:text-xl">{t("single.markAsVisited")}</span>{" "}
              </Button>
              <Button size={"lg"} isDisabled={true} className="w-[48%]">
                {" "}
                <span className="text-lg md:text-xl">{t("single.fillFeedback")}</span>
              </Button>
            </div>
          </div>

          <Tabs
            isLazy
            defaultIndex={0}
            isFitted
            variant="enclosed"
            className="md:mt-10"
          >
            <TabList>
              <Tab _selected={{ color: "white", bg: "#8C4E1D" }}>
                <span className="text-xl font-semibold">{t("single.about")}</span>
              </Tab>
              <Tab _selected={{ color: "white", bg: "#8C4E1D" }}>
                <span className="text-xl font-semibold">{t("single.reviews")}</span>
              </Tab>
              <Tab _selected={{ color: "white", bg: "#8C4E1D" }}>
                <span className="text-xl font-semibold">{t("single.data")}</span>
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
