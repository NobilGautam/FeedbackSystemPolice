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
import AOS from "aos";
import { useAuthState } from "react-firebase-hooks/auth";
import { Auth } from "../Firebase";
import { Spinner } from "@chakra-ui/react";
import { IoCheckmarkDoneCircleOutline, IoDocumentTextOutline } from "react-icons/io5";
function Single() {
  const [user]=useAuthState(Auth);
  const { id } = useParams();
  const {
    setShow2,
    QR,
    tableData: policeStations,
    setIndividual,
    fetchVisits,
    visits,
    visitsLoader,
    tableData: PoliceData,
  } = useSupabase();
  const [policeData, setPoliceData] = useState({});
  const [flag,setFlag]=useState(false);
  const [docu,setDocu]=useState('');
  const navigator = useNavigate();
  const { t } = useTranslation();
  useEffect(() => {
    if (user) {
      fetchVisits(user.email);
      console.log(visits)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [PoliceData, policeStations,user,visitsLoader]);

  
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

useEffect(()=>{
var ff=true;
var dou='';
  for(var i=0; i<visits.length; i++){
    if(visits[i].policeStation===policeData.name && visits[i].feedback===null){
      
      ff=false;
      dou=visits[i].documentID;
      break;
    }
  }
  setFlag(ff);
  setDocu(dou);
}
,[PoliceData, policeStations,user,visitsLoader,visits])
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
// if(visits.length===0){
//   return null;
// }
const handleClickFeed=()=>{
  navigator(`/newFeedback/${docu}`)
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
  return (
    <div data-aos="fade-up">
      <div className="container mt-12 p-6 pb-12 md:p-0 md:mt-32 mx-auto flex items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 mt-16 gap-24 max-h-screen w-full">
          <div className="flex items-center flex-col justify-center h-full">
            <Button
              size={"lg"}
              className="customButton self-start"
              onClick={handleClick2}
            >
              {" "}
                <IoMdArrowBack />
              <span className="text-lg ml-2">
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
                <IoCheckmarkDoneCircleOutline/>
                <span className="text-lg ml-2 md:text-xl">{t("single.markAsVisited")}</span>{" "}
              </Button>
              <Button size={"lg"} isDisabled={flag?true:false} className="w-[48%]" onClick={handleClickFeed}>
                {" "}
          
                <span className="text-lg md:text-xl">Fill Feedback</span>
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
