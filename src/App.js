import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
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
  const [user] = useAuthState(Auth);
  return (
    <div>
      <Navbar />
      <ChatBot steps={steps} floating={true} className="chatbot" />
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        {user && <Route path="/myfeedback" element={<Feedback />}></Route>}
        <Route path="/single/:id" element={<Single />}></Route>
        {user && <Route path="/myVisits" element={<MyVisits />}></Route>}
        {user && <Route path="/newFeedback/:documentId" element={<Form />} />}
        <Route path="/newVisit" element={<NewVisit />} />
        {user && <Route path="/form" element={<Form />}></Route>}
        {/* { user && <Route path="/chat" element={<Chat/>}></Route>}
         */}
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </div>
  );
}

export default App;
