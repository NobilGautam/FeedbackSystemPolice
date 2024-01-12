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

const helplines=[{
  name:"Police Control Room",
  number:100
},

{
  name:"Traffic Police",
  number:1095
},
{
  name:"Women and Senior Citizen",
  number:1090
},
{
  name:"Fire Brigade",
  number:101
},

{
  name:"Ambulance",
  number:102
},


{
  name:"Emergency Services",
  number:108,
},



{
  name:"Help For SC/ST",
  number:18001806025,
  number2:18002021989,
  

},
{
  name:"Sampark 181 Helpline",
  number:181,
  
},
{
  name:"ACB",
  number:1064,
  
},
{
  name:"Cyber Crime",
  number:1930,
  
},




]
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
          <ModalHeader>
           <h1 className="text-2xl text-[#8C4E1D] font-sans font-semibold"> Rajasthan Police HelpLines</h1>
            </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              {helplines.map((item,index)=>{
                return (
                  <div key={index} className="py-2">
                <h2  className="text-[#8C4E1D] font-sans  font-bold  text-md">{item.name}:&nbsp;{item.number}{item.number2?`/${item.number2}`:""}</h2>
                </div>)
              })}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button className="customButton" onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default App;
