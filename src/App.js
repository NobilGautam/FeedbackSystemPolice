import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Pages/Home";
import { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import Feedback from "./Pages/Feedback";
import Navbar from "./components/Navbar";
import Single from "./Pages/Single";
import Form from "./Pages/Form";
import { useAuthState } from "react-firebase-hooks/auth";
import { Auth } from "./Firebase";
import Error from "./Pages/Error";
import NewVisit from "./Pages/NewVisit";
import MyVisits from "./Pages/MyVisits";
import ChatBot from "react-simple-chatbot";
import { useTranslation } from "react-i18next";
import QR from "./Pages/QR";
import FeedbackThread from "./Pages/FeedbackThread";
import {
  ModalOverlay,
  useDisclosure,
  ModalContent,
  Text,
  ModalBody,
  ModalHeader,
  Modal,
} from "@chakra-ui/react";
import { steps } from "./components/steps";
import { helplines } from "./components/helpline";
import { IoCallOutline, IoClose } from "react-icons/io5";
import FollowupForm from "./Pages/FollowupForm";
import IntialLoader from "./components/IntialLoader";
import Grievance from "./Pages/Grievance";
import MyGri from "./components/MyGri";
import Admin from "./Pages/Admin";
import SingleAdmin from "./Pages/SingleAdmin";
import { useSupabase } from "./context/SupabaseContext";

function App() {
  const OverlayOne = () => (
    <ModalOverlay bg="none" backdropFilter="blur(10px)" backdropBlur="10px" />
  );
  const [user] = useAuthState(Auth);
  const [overlay, setOverlay] = useState(<OverlayOne />);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [initialloader,setIntitalLoader]=useState(true);
  const [isAdminLoggedIn, setAdminLoggedIn] = useState(false);
  const navigator=useNavigate();

  // Function to handle admin login
  const handleAdminLogin = () => {
    setAdminLoggedIn(true);
  
  };

  // Function to handle admin logout
  const handleAdminLogout = () => {
    
    setAdminLoggedIn(false);
    sessionStorage.removeItem('authToken');
   

  };
  useEffect(()=>{
    setTimeout(() => {
      setIntitalLoader(false);
    }, 2500);
  }, []);

  const { t } = useTranslation();
  const { admin } = useSupabase();


  return (
    <div>
        <>
          <Navbar isAdminLoggedIn={isAdminLoggedIn} onAdminLogout={handleAdminLogout} />
          <ChatBot steps={steps} floating={true} className="chatbot" />
          <Button
            className="customButton helpline"
            onClick={() => {
              setOverlay(<OverlayOne />);
              onOpen();
            }}
          >
            <IoCallOutline />
            <span className="ml-2">{t("navbar.helplines")}</span>
          </Button>
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            {user && <Route path="/myfeedback" element={<Feedback />}></Route>}
            {user && (
              <Route
                path="/myfeedback/:documentID"
                element={<Feedback />}
              ></Route>
            )}
            <Route path="/single/:id" element={<Single />}></Route>
            {user && <Route path="/myVisits" element={<MyVisits />}></Route>}
            {user && (
              <Route path="/newFeedback/:documentId" element={<Form />} />
            )}
             <Route path="/admin" element={<Admin handleAdminLogin={handleAdminLogin} />}></Route>
           
              <Route
                path="/singleAdmin/:pincode"
                element={<SingleAdmin admin={admin} isAdminLoggedin={isAdminLoggedIn} />}
              ></Route>
            
            <Route path="/newVisit" element={<NewVisit />} />
            <Route path="/QR/:id" element={<QR />} />
            {user && <Route path="/feedbackThread/:documentID" element={<FeedbackThread/>}></Route>}
            {user && <Route path="/form" element={<Form />}></Route>}
            {user && (
              <Route
                path="/followupform/:documentID"
                element={<FollowupForm />}
              ></Route>
            )}
            {<Route path="/followupform" element={<FollowupForm />}></Route>}
            {user && <Route path="/grievance" element={<Grievance />}></Route>}
            {/* { user && <Route path="/chat" element={<Chat/>}></Route>}
             */}
            <Route path="*" element={<Error />}></Route>
            <Route path="/myGri" element={<MyGri />}></Route>
          </Routes>
          <Modal isCentered isOpen={isOpen} onClose={onClose}>
            {overlay}
            <ModalContent className="border-solid border-2 border-[#8C4E1D]">
              <ModalHeader className="bg-[#8C4E1D] flex justify-between">
                <h1 className="text-2xl text-white font-sans font-semibold">
                  Rajasthan Police Helplines
                </h1>
                <Button className="customButton" onClick={onClose}>
                  <IoClose />
                </Button>
              </ModalHeader>
              <ModalBody>
                <Text>
                  {helplines.map((item, index) => {
                    return (
                      <div key={index} className="py-2">
                        <h2 className="text-[#8C4E1D] font-sans font-bold text-md">
                          {t("modal." + item.name)}:&nbsp;
                          <>
                            <a
                              href={"tel:" + item.number}
                              className="text-blue-500 underline"
                            >
                              {item.number}
                            </a>
                          </>
                          {item.number2 && (
                            <>
                              {" "}
                              /{" "}
                              <a
                                href={"tel:" + item.number}
                                className="text-blue-500 underline"
                              >
                                {item.number}
                              </a>
                            </>
                          )}
                        </h2>
                      </div>
                    );
                  })}
                </Text>
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
    </div>
  );
}

export default App;
