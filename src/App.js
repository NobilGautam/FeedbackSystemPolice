import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import { useState,useEffect } from "react";
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
import QR from "./Pages/QR";
import { ModalOverlay,useDisclosure,ModalContent,ModalCloseButton,Text,ModalBody,ModalHeader,ModalFooter,Modal} from "@chakra-ui/react";

const steps = [
  {
    id: "0",
    message: "Welcome to react chatbot!",
    trigger: "1",
  },
  {
    id: "1",
    message: "Bye!",
    end: true,
  },
];

function App() {
  const OverlayOne = () => (
    <ModalOverlay
      bg='none'
      
      backdropFilter='blur(10px)'
      backdropBlur='10px'
    />
  )
  const [user] = useAuthState(Auth);
  const [overlay, setOverlay] = useState(<OverlayOne />)
  const { isOpen, onOpen, onClose } = useDisclosure()



 


  return (
    <div>
      <Navbar />
   
      <ChatBot steps={steps} floating={true} className="chatbot" />
      <Button
   
className="customButton helpline"
        onClick={() => {
          setOverlay(<OverlayOne />)
          onOpen()
        }}
      >HelpLines</Button>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        {user && <Route path="/myfeedback" element={<Feedback />}></Route>}
        <Route path="/single/:id" element={<Single />}></Route>
        {user && <Route path="/myVisits" element={<MyVisits />}></Route>}
        {user && <Route path="/newFeedback/:documentId" element={<Form />} />}
        <Route path="/newVisit" element={<NewVisit />} />
        <Route path="/QR/:id" element={<QR />} />
        {user && <Route path="/form" element={<Form />}></Route>}
        {/* { user && <Route path="/chat" element={<Chat/>}></Route>}
         */}
        <Route path="*" element={<Error />}></Route>
      </Routes>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Custom backdrop filters!</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default App;
